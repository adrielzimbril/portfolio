-- PostgreSQL RPC function to handle analytics atomically
CREATE OR REPLACE FUNCTION increment_page_analytics(
  p_path TEXT,
  p_type TEXT,
  p_slug TEXT DEFAULT NULL,
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
  INSERT INTO page_counters (path, type, slug, total_views, created_at, updated_at)
  VALUES (p_path, p_type, p_slug, 1, p_timestamp, p_timestamp)
  ON CONFLICT (path, type, COALESCE(slug, '')) 
  DO UPDATE SET 
    total_views = page_counters.total_views + 1,
    updated_at = p_timestamp;

  -- Get new total counter value
  SELECT pc.total_views INTO v_total_views
  FROM page_counters pc
  WHERE pc.path = p_path 
    AND pc.type = p_type 
    AND (pc.slug = p_slug OR (pc.slug IS NULL AND p_slug IS NULL));

  -- 2. Check if this user has already seen this page
  SELECT view_count INTO v_existing_user_count
  FROM unique_views
  WHERE user_ip = p_user_ip 
    AND path = p_path 
    AND type = p_type 
    AND (slug = p_slug OR (slug IS NULL AND p_slug IS NULL));

  IF v_existing_user_count IS NULL THEN
    -- New unique user
    v_is_new_unique_user := TRUE;
    
    INSERT INTO unique_views (user_ip, path, type, slug, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, p_path, p_type, p_slug, p_timestamp, p_timestamp, 1, p_details);
  ELSE
    -- Existing user - update their last view
    UPDATE unique_views 
    SET 
      last_view_at = p_timestamp,
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip 
      AND path = p_path 
      AND type = p_type 
      AND (slug = p_slug OR (slug IS NULL AND p_slug IS NULL));
  END IF;

  -- 3. Count total unique users for this page
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.path = p_path 
    AND uv.type = p_type 
    AND (uv.slug = p_slug OR (uv.slug IS NULL AND p_slug IS NULL));

  -- Return results
  RETURN QUERY SELECT v_total_views, v_unique_users, v_is_new_unique_user;
END;
$$;

-- Recommended table structure:

-- Table to count total views per page
CREATE TABLE IF NOT EXISTS page_counters (
  id BIGSERIAL PRIMARY KEY,
  path TEXT NOT NULL,
  type TEXT NOT NULL,
  slug TEXT,
  total_views BIGINT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(path, type, slug)
);

-- Table to track views per unique user
CREATE TABLE IF NOT EXISTS unique_views (
  id BIGSERIAL PRIMARY KEY,
  user_ip TEXT NOT NULL,
  path TEXT NOT NULL,
  type TEXT NOT NULL,
  slug TEXT,
  first_view_at TIMESTAMPTZ DEFAULT NOW(),
  last_view_at TIMESTAMPTZ DEFAULT NOW(),
  view_count INTEGER DEFAULT 1,
  details JSONB,
  UNIQUE(user_ip, path, type, slug)
);

-- Indexes to optimize performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_page_counters_unique 
ON page_counters (path, type, slug);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_views_user_page 
ON unique_views (user_ip, path, type, slug);

CREATE INDEX IF NOT EXISTS idx_unique_views_page_lookup 
ON unique_views (path, type, slug);

CREATE INDEX IF NOT EXISTS idx_page_counters_lookup 
ON page_counters (path, type, slug);

-- Alternative simpler function if you prefer
CREATE OR REPLACE FUNCTION get_page_analytics(
  p_path TEXT,
  p_type TEXT,
  p_slug TEXT DEFAULT NULL
)
RETURNS TABLE (
  total_views BIGINT,
  unique_users BIGINT
) 
LANGUAGE plpgsql
AS $$
DECLARE
  v_total_views BIGINT;
  v_unique_users BIGINT;
BEGIN
  -- Get total counter
  SELECT COALESCE(pc.total_views, 0) INTO v_total_views
  FROM page_counters pc
  WHERE pc.path = p_path 
    AND pc.type = p_type 
    AND (pc.slug = p_slug OR (pc.slug IS NULL AND p_slug IS NULL));

  -- Count unique users
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.path = p_path 
    AND uv.type = p_type 
    AND (uv.slug = p_slug OR (uv.slug IS NULL AND p_slug IS NULL));

  RETURN QUERY SELECT COALESCE(v_total_views, 0), COALESCE(v_unique_users, 0);
END;
$$;