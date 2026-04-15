-- Migration: 20250924001_remove_path_from_analytics
-- Date: 2025-09-24
-- Description: Remove path field and use slug as primary identifier

-- 1. Create a function to migrate existing data
CREATE OR REPLACE FUNCTION migrate_analytics_data()
RETURNS void AS $$
BEGIN
  -- Update entries where slug is NULL to use path as slug
  UPDATE page_counters 
  SET slug = path 
  WHERE slug IS NULL;
  
  UPDATE unique_views 
  SET slug = path 
  WHERE slug IS NULL;
  
  -- Remove duplicates keeping the most recent entry
  DELETE FROM page_counters a
  USING (
    SELECT MIN(ctid) as ctid, type, slug
    FROM page_counters 
    GROUP BY type, slug
    HAVING COUNT(*) > 1
  ) b
  WHERE a.type = b.type 
    AND a.slug = b.slug 
    AND a.ctid <> b.ctid;
  
  -- Update unique views to match
  DELETE FROM unique_views uv1
  USING (
    SELECT DISTINCT ON (type, slug) id, type, slug
    FROM unique_views
    ORDER BY type, slug, last_view_at DESC
  ) uv2
  WHERE uv1.type = uv2.type 
    AND uv1.slug = uv2.slug 
    AND uv1.id <> uv2.id;
END;
$$ LANGUAGE plpgsql;

-- 2. Execute data migration
SELECT migrate_analytics_data();

-- 3. Remove existing constraints
ALTER TABLE page_counters DROP CONSTRAINT IF EXISTS page_counters_pkey;
ALTER TABLE unique_views DROP CONSTRAINT IF EXISTS unique_views_pkey;

-- 4. Remove existing indexes
DROP INDEX IF EXISTS page_counters_path_type_slug_idx;
DROP INDEX IF EXISTS unique_views_user_ip_path_type_slug_idx;

-- 5. Remove redundant path columns
ALTER TABLE page_counters DROP COLUMN IF EXISTS path;
ALTER TABLE unique_views DROP COLUMN IF EXISTS path;

-- 6. Update primary keys
-- First remove existing constraints if they exist
ALTER TABLE page_counters DROP CONSTRAINT IF EXISTS page_counters_pkey;
ALTER TABLE unique_views DROP CONSTRAINT IF EXISTS unique_views_pkey;

-- Then add new primary keys
ALTER TABLE page_counters 
  ADD PRIMARY KEY (type, slug);
  
ALTER TABLE unique_views 
  ADD PRIMARY KEY (user_ip, type, slug);

-- 7. Recreate necessary indexes
CREATE INDEX IF NOT EXISTS page_counters_type_slug_idx 
  ON page_counters(type, slug);
  
CREATE INDEX IF NOT EXISTS unique_views_type_slug_idx 
  ON unique_views(type, slug);

-- 8. Update get_page_analytics function
CREATE OR REPLACE FUNCTION get_page_analytics(
  p_type TEXT,
  p_slug TEXT
)
RETURNS TABLE (
  total_views BIGINT,
  unique_users BIGINT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_views BIGINT := 0;
  v_unique_users BIGINT := 0;
BEGIN
  -- Get total counter
  SELECT COALESCE(pc.total_views, 0) INTO v_total_views
  FROM page_counters pc
  WHERE pc.type = p_type AND pc.slug = p_slug;
    
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.type = p_type AND uv.slug = p_slug;

  RETURN QUERY SELECT v_total_views, v_unique_users;
END;
$$;

-- 9. Update increment_page_analytics function
CREATE OR REPLACE FUNCTION increment_page_analytics(
  p_type TEXT,
  p_slug TEXT,
  p_user_ip TEXT DEFAULT 'unknown',
  p_details JSONB DEFAULT NULL,
  p_timestamp TIMESTAMPTZ DEFAULT NOW()
)
RETURNS TABLE (
  total_views BIGINT,
  unique_users BIGINT,
  is_new_unique_user BOOLEAN
) 
LANGUAGE plpgsql
AS $$
DECLARE
  v_is_new_unique_user BOOLEAN := FALSE;
  v_total_views BIGINT;
  v_unique_users BIGINT;
  v_existing_user_count INTEGER;
BEGIN
  -- 1. Increment total view counter
  INSERT INTO page_counters (type, slug, total_views, created_at, updated_at)
  VALUES (p_type, p_slug, 1, p_timestamp, p_timestamp)
  ON CONFLICT (type, slug) 
  DO UPDATE SET 
    total_views = page_counters.total_views + 1,
    updated_at = p_timestamp;

  -- Get new total counter value
  SELECT pc.total_views INTO v_total_views
  FROM page_counters pc
  WHERE pc.type = p_type 
    AND pc.slug = p_slug;

  -- 2. Check if this user has already seen this page
  SELECT view_count INTO v_existing_user_count
  FROM unique_views
  WHERE user_ip = p_user_ip 
    AND type = p_type 
    AND slug = p_slug;

  IF v_existing_user_count IS NULL THEN
    -- New unique user
    v_is_new_unique_user := TRUE;
    
    INSERT INTO unique_views (user_ip, type, slug, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, p_type, p_slug, p_timestamp, p_timestamp, 1, p_details);
  ELSE
    -- Existing user - update their last view
    UPDATE unique_views 
    SET 
      last_view_at = p_timestamp,
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip 
      AND type = p_type 
      AND slug = p_slug;
  END IF;

  -- 3. Count total unique users for this page
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.type = p_type 
    AND uv.slug = p_slug;

  -- Return results
  RETURN QUERY SELECT v_total_views, v_unique_users, v_is_new_unique_user;
END;
$$;

-- 10. Remove migration function
DROP FUNCTION IF EXISTS migrate_analytics_data();
