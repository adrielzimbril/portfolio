-- Migration: 004_fix_ambiguous_column.sql
-- Date: 2025-09-06
-- Description: Correction de l'ambiguïté de colonne dans upsert_unique_view

-- Recréer la fonction helper pour unique_views avec les références de colonnes clarifiées
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
  -- Tentative d'update
  IF p_slug IS NOT NULL THEN
    UPDATE unique_views 
    SET 
      last_view_at = NOW(),
      view_count = unique_views.view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip AND path = p_path AND type = p_type AND slug = p_slug
    RETURNING unique_views.view_count INTO v_view_count;
  ELSE
    UPDATE unique_views 
    SET 
      last_view_at = NOW(),
      view_count = unique_views.view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip AND path = p_path AND type = p_type AND slug IS NULL
    RETURNING unique_views.view_count INTO v_view_count;
  END IF;

  -- Si pas trouvé, insérer
  IF NOT FOUND THEN
    v_is_new_user := TRUE;
    INSERT INTO unique_views (user_ip, path, type, slug, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, p_path, p_type, p_slug, NOW(), NOW(), 1, p_details)
    RETURNING unique_views.view_count INTO v_view_count;
  END IF;

  RETURN QUERY SELECT v_view_count, v_is_new_user;
END;
$$;