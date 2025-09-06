-- Migration: 003_fix_function_conflicts.sql
-- Date: 2025-09-06
-- Description: Résolution des conflits de fonctions PostgreSQL

-- 1. Supprimer toutes les versions existantes de la fonction
DROP FUNCTION IF EXISTS increment_page_analytics(TEXT, TEXT, TEXT, TEXT, JSONB);
DROP FUNCTION IF EXISTS increment_page_analytics(TEXT, TEXT, TEXT, TEXT, JSONB, TIMESTAMPTZ);
DROP FUNCTION IF EXISTS get_page_analytics(TEXT, TEXT, TEXT);

-- 2. Supprimer les fonctions helper si elles existent déjà
DROP FUNCTION IF EXISTS upsert_page_counter(TEXT, TEXT, TEXT, INTEGER);
DROP FUNCTION IF EXISTS upsert_unique_view(TEXT, TEXT, TEXT, TEXT, JSONB);

-- 3. Recréer la fonction helper pour page_counter
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
  -- Tentative d'update
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

  -- Si pas trouvé, insérer
  IF NOT FOUND THEN
    INSERT INTO page_counters (path, type, slug, total_views, created_at, updated_at)
    VALUES (p_path, p_type, p_slug, p_increment, NOW(), NOW())
    RETURNING total_views INTO v_total_views;
  END IF;

  RETURN v_total_views;
END;
$$;

-- 4. Recréer la fonction helper pour unique_views
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

-- 5. Créer UNE SEULE version de la fonction principale
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
  -- 1. Incrémenter le compteur total
  SELECT upsert_page_counter(p_path, p_type, p_slug, 1) INTO v_total_views;

  -- 2. Gérer la vue unique
  SELECT * INTO v_user_view_count, v_is_new_user 
  FROM upsert_unique_view(p_user_ip, p_path, p_type, p_slug, p_details);

  -- 3. Compter les utilisateurs uniques
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

-- 6. Fonction simple pour récupérer les analytics sans incrémenter
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
  v_total_views BIGINT := 0;
  v_unique_users BIGINT := 0;
BEGIN
  -- Récupérer le compteur total
  IF p_slug IS NOT NULL THEN
    SELECT COALESCE(pc.total_views, 0) INTO v_total_views
    FROM page_counters pc
    WHERE pc.path = p_path AND pc.type = p_type AND pc.slug = p_slug;
    
    SELECT COUNT(*) INTO v_unique_users
    FROM unique_views uv
    WHERE uv.path = p_path AND uv.type = p_type AND uv.slug = p_slug;
  ELSE
    SELECT COALESCE(pc.total_views, 0) INTO v_total_views
    FROM page_counters pc
    WHERE pc.path = p_path AND pc.type = p_type AND pc.slug IS NULL;
    
    SELECT COUNT(*) INTO v_unique_users
    FROM unique_views uv
    WHERE uv.path = p_path AND uv.type = p_type AND uv.slug IS NULL;
  END IF;

  RETURN QUERY SELECT v_total_views, v_unique_users;
END;
$$;