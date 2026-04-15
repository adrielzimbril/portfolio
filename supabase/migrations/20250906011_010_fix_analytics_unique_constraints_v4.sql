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
    RETURNING view_count INTO v_view_count;
  ELSE
    UPDATE unique_views 
    SET 
      last_view_at = NOW(),
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip AND path = p_path AND type = p_type AND slug IS NULL
    RETURNING view_count INTO v_view_count;
  END IF;

  -- If not found, insert
  IF NOT FOUND THEN
    v_is_new_user := TRUE;
    INSERT INTO unique_views (user_ip, path, type, slug, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, p_path, p_type, p_slug, NOW(), NOW(), 1, p_details)
    RETURNING view_count INTO v_view_count;
  END IF;

  RETURN QUERY SELECT v_view_count, v_is_new_user;
END;
$$;
