-- Migration: 002_fix_analytics_unique_constraints.sql
-- Date: 2025-09-06
-- Description: Fix unique constraints to handle NULL values in slug

-- 1. Remove old unique constraints if they exist
ALTER TABLE page_counters DROP CONSTRAINT IF EXISTS page_counters_path_type_slug_key;
ALTER TABLE unique_views DROP CONSTRAINT IF EXISTS unique_views_user_ip_path_type_slug_key;

-- 2. Remove old indexes if they exist
DROP INDEX IF EXISTS idx_page_counters_unique;
DROP INDEX IF EXISTS idx_unique_views_user_page;

-- 3. Create partial unique indexes to handle NULL correctly
-- For page_counters: unique constraint when slug IS NOT NULL
CREATE UNIQUE INDEX idx_page_counters_unique_with_slug 
ON page_counters (path, type, slug) 
WHERE slug IS NOT NULL;

-- For page_counters: unique constraint when slug IS NULL
CREATE UNIQUE INDEX idx_page_counters_unique_without_slug 
ON page_counters (path, type) 
WHERE slug IS NULL;

-- For unique_views: unique constraint when slug IS NOT NULL
CREATE UNIQUE INDEX idx_unique_views_user_page_with_slug 
ON unique_views (user_ip, path, type, slug) 
WHERE slug IS NOT NULL;

-- For unique_views: unique constraint when slug IS NULL
CREATE UNIQUE INDEX idx_unique_views_user_page_without_slug 
ON unique_views (user_ip, path, type) 
WHERE slug IS NULL;

-- 4. Add performance indexes for lookups
CREATE INDEX IF NOT EXISTS idx_unique_views_page_lookup 
ON unique_views (path, type, slug);

CREATE INDEX IF NOT EXISTS idx_page_counters_lookup 
ON page_counters (path, type, slug);

-- 5. Helper function to do upserts with NULL handling
CREATE OR REPLACE FUNCTION upsert_page_counter(
  p_path TEXT,
  p_type TEXT,
  p_slug TEXT DEFAULT NULL,
  p_increment INTEGER DEFAULT 1
)
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_views BIGINT;
BEGIN
  -- Try update
  IF p_slug IS NOT NULL THEN
    UPDATE page_counters 
    SET total_views = total_views + p_increment, updated_at = NOW()
    WHERE path = p_path AND type = p_type AND slug = p_slug
    RETURNING total_views INTO v_total_views;
  ELSE
    UPDATE page_counters 
    SET total_views = total_views + p_increment, updated_at = NOW()
    WHERE path = p_path AND type = p_type AND slug IS NULL
    RETURNING total_views INTO v_total_views;
  END IF;

  -- If not found, insert
  IF NOT FOUND THEN
    INSERT INTO page_counters (path, type, slug, total_views, created_at, updated_at)
    VALUES (p_path, p_type, p_slug, p_increment, NOW(), NOW())
    RETURNING total_views INTO v_total_views;
  END IF;

  RETURN v_total_views;
END;
$$;

-- 6. Helper function to upsert unique_views
CREATE OR REPLACE FUNCTION upsert_unique_view(
  p_user_ip TEXT,
  p_path TEXT,
  p_type TEXT,
  p_slug TEXT DEFAULT NULL,
  p_details JSONB DEFAULT NULL
)
RETURNS TABLE (
  view_count INTEGER,
  is_new_user BOOLEAN
)
LANGUAGE plpgsql
AS $$
DECLARE
  v_view_count INTEGER;
  v_is_new_user BOOLEAN := FALSE;
BEGIN
  -- Try update
  IF p_slug IS NOT NULL THEN
    UPDATE unique_views 
    SET 
      last_view_at = NOW(),
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip AND path = p_path AND type = p_type AND slug = p_slug
    RETURNING unique_views.view_count INTO v_view_count;
  ELSE
    UPDATE unique_views 
    SET 
      last_view_at = NOW(),
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip AND path = p_path AND type = p_type AND slug IS NULL
    RETURNING unique_views.view_count INTO v_view_count;
  END IF;

  -- If not found, insert
  IF NOT FOUND THEN
    v_is_new_user := TRUE;
    INSERT INTO unique_views (user_ip, path, type, slug, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, p_path, p_type, p_slug, NOW(), NOW(), 1, p_details)
    RETURNING unique_views.view_count INTO v_view_count;
  END IF;

  RETURN QUERY SELECT v_view_count, v_is_new_user;
END;
$$;

-- 7. Main function to increment analytics
CREATE OR REPLACE FUNCTION increment_page_analytics(
  p_path TEXT,
  p_type TEXT,
  p_slug TEXT DEFAULT NULL,
  p_user_ip TEXT DEFAULT 'unknown',
  p_details JSONB DEFAULT NULL
)
RETURNS TABLE (
  total_views BIGINT,
  unique_users BIGINT,
  user_view_count INTEGER,
  is_new_unique_user BOOLEAN
) 
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_views BIGINT;
  v_unique_users BIGINT;
  v_user_view_count INTEGER;
  v_is_new_user BOOLEAN;
BEGIN
  -- 1. Increment total counter
  SELECT upsert_page_counter(p_path, p_type, p_slug, 1) INTO v_total_views;

  -- 2. Handle unique view
  SELECT * INTO v_user_view_count, v_is_new_user 
  FROM upsert_unique_view(p_user_ip, p_path, p_type, p_slug, p_details);

  -- 3. Count unique users
  IF p_slug IS NOT NULL THEN
    SELECT COUNT(*) INTO v_unique_users
    FROM unique_views 
    WHERE path = p_path AND type = p_type AND slug = p_slug;
  ELSE
    SELECT COUNT(*) INTO v_unique_users
    FROM unique_views 
    WHERE path = p_path AND type = p_type AND slug IS NULL;
  END IF;

  RETURN QUERY SELECT v_total_views, v_unique_users, v_user_view_count, v_is_new_user;
END;
$$;