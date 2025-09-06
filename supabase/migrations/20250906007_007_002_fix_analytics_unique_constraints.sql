-- Migration: 002_fix_analytics_unique_constraints.sql
-- Date: 2025-09-06
-- Description: Correction des contraintes uniques pour gérer les valeurs NULL dans slug

-- 1. Supprimer les anciennes contraintes uniques si elles existent
ALTER TABLE page_counters DROP CONSTRAINT IF EXISTS page_counters_path_type_slug_key;
ALTER TABLE unique_views DROP CONSTRAINT IF EXISTS unique_views_user_ip_path_type_slug_key;

-- 2. Supprimer les anciens index s'ils existent
DROP INDEX IF EXISTS idx_page_counters_unique;
DROP INDEX IF EXISTS idx_unique_views_user_page;

-- 3. Créer des index uniques partiels pour gérer correctement les NULL
-- Pour page_counters : contrainte unique quand slug IS NOT NULL
CREATE UNIQUE INDEX idx_page_counters_unique_with_slug 
ON page_counters (path, type, slug) 
WHERE slug IS NOT NULL;

-- Pour page_counters : contrainte unique quand slug IS NULL
CREATE UNIQUE INDEX idx_page_counters_unique_without_slug 
ON page_counters (path, type) 
WHERE slug IS NULL;

-- Pour unique_views : contrainte unique quand slug IS NOT NULL
CREATE UNIQUE INDEX idx_unique_views_user_page_with_slug 
ON unique_views (user_ip, path, type, slug) 
WHERE slug IS NOT NULL;

-- Pour unique_views : contrainte unique quand slug IS NULL
CREATE UNIQUE INDEX idx_unique_views_user_page_without_slug 
ON unique_views (user_ip, path, type) 
WHERE slug IS NULL;

-- 4. Ajouter des index de performance pour les lookups
CREATE INDEX IF NOT EXISTS idx_unique_views_page_lookup 
ON unique_views (path, type, slug);

CREATE INDEX IF NOT EXISTS idx_page_counters_lookup 
ON page_counters (path, type, slug);

-- 5. Fonction helper pour faire les upserts avec gestion des NULL
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

-- 6. Fonction helper pour upsert unique_views
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

-- 7. Fonction principale pour incrémenter les analytics
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