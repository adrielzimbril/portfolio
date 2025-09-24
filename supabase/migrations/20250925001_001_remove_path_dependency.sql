-- Migration pour supprimer la dépendance au champ path

-- 1. Créer une table pour stocker les identifiants uniques des pages
CREATE TABLE IF NOT EXISTS page_identifiers (
  id BIGSERIAL PRIMARY KEY,
  type TEXT NOT NULL,
  slug TEXT,
  path TEXT, -- Gardé pour la rétrocompatibilité pendant la migration
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(type, slug)
);

-- 2. Ajouter des index pour les performances
CREATE INDEX IF NOT EXISTS idx_page_identifiers_type_slug ON page_identifiers(type, slug);
CREATE INDEX IF NOT EXISTS idx_page_identifiers_path ON page_identifiers(path);

-- 3. Fonction utilitaire pour obtenir ou créer un identifiant de page
CREATE OR REPLACE FUNCTION get_or_create_page_id(
  p_type TEXT,
  p_slug TEXT DEFAULT NULL
) 
RETURNS BIGINT
LANGUAGE plpgsql
AS $$
DECLARE
  v_page_id BIGINT;
BEGIN
  -- Essayer de trouver un identifiant existant
  SELECT id INTO v_page_id
  FROM page_identifiers
  WHERE type = p_type 
    AND (slug = p_slug OR (slug IS NULL AND p_slug IS NULL));
  
  -- Si non trouvé, en créer un nouveau
  IF v_page_id IS NULL THEN
    INSERT INTO page_identifiers (type, slug)
    VALUES (p_type, p_slug)
    RETURNING id INTO v_page_id;
  END IF;
  
  RETURN v_page_id;
END;
$$;

-- 4. Mettre à jour la table page_counters
ALTER TABLE page_counters 
  ADD COLUMN page_id BIGINT,
  ADD CONSTRAINT fk_page_counter_identifier 
    FOREIGN KEY (page_id) 
    REFERENCES page_identifiers(id)
    ON DELETE CASCADE;

-- 5. Mettre à jour la table unique_views
ALTER TABLE unique_views 
  ADD COLUMN page_id BIGINT,
  ADD CONSTRAINT fk_unique_view_identifier 
    FOREIGN KEY (page_id) 
    REFERENCES page_identifiers(id)
    ON DELETE CASCADE;

-- 6. Mettre à jour les fonctions RPC
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
  v_page_id BIGINT;
  v_is_new_unique_user BOOLEAN := FALSE;
  v_total_views BIGINT;
  v_unique_users BIGINT;
  v_existing_user_count INTEGER;
BEGIN
  -- Obtenir ou créer l'identifiant de page
  SELECT get_or_create_page_id(p_type, p_slug) INTO v_page_id;
  
  -- Mettre à jour le chemin pour la rétrocompatibilité
  UPDATE page_identifiers 
  SET path = p_path, updated_at = NOW()
  WHERE id = v_page_id;

  -- 1. Incrémenter le compteur total de vues
  INSERT INTO page_counters (page_id, total_views, created_at, updated_at)
  VALUES (v_page_id, 1, p_timestamp, p_timestamp)
  ON CONFLICT (page_id) 
  DO UPDATE SET 
    total_views = page_counters.total_views + 1,
    updated_at = p_timestamp
  RETURNING total_views INTO v_total_views;

  -- 2. Vérifier si cet utilisateur a déjà vu cette page
  SELECT view_count INTO v_existing_user_count
  FROM unique_views
  WHERE user_ip = p_user_ip 
    AND page_id = v_page_id;

  IF v_existing_user_count IS NULL THEN
    -- Nouvel utilisateur unique
    v_is_new_unique_user := TRUE;
    
    INSERT INTO unique_views (user_ip, page_id, first_view_at, last_view_at, view_count, details)
    VALUES (p_user_ip, v_page_id, p_timestamp, p_timestamp, 1, p_details);
  ELSE
    -- Utilisateur existant - mettre à jour sa dernière vue
    UPDATE unique_views 
    SET 
      last_view_at = p_timestamp,
      view_count = view_count + 1,
      details = p_details
    WHERE user_ip = p_user_ip 
      AND page_id = v_page_id
    RETURNING view_count INTO v_existing_user_count;
  END IF;

  -- 3. Compter le nombre total d'utilisateurs uniques pour cette page
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.page_id = v_page_id;

  -- Retourner les résultats
  RETURN QUERY SELECT v_total_views, v_unique_users, v_is_new_unique_user;
END;
$$;

-- Mettre à jour la fonction get_page_analytics
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
  v_page_id BIGINT;
  v_total_views BIGINT;
  v_unique_users BIGINT;
BEGIN
  -- Obtenir l'identifiant de page
  SELECT id INTO v_page_id
  FROM page_identifiers
  WHERE type = p_type 
    AND (slug = p_slug OR (slug IS NULL AND p_slug IS NULL));
    
  IF v_page_id IS NULL THEN
    -- Aucune donnée pour cette page
    RETURN QUERY SELECT 0::BIGINT, 0::BIGINT;
    RETURN;
  END IF;

  -- Récupérer le compteur total
  SELECT COALESCE(pc.total_views, 0) INTO v_total_views
  FROM page_counters pc
  WHERE pc.page_id = v_page_id;

  -- Compter les utilisateurs uniques
  SELECT COUNT(*) INTO v_unique_users
  FROM unique_views uv
  WHERE uv.page_id = v_page_id;

  RETURN QUERY SELECT COALESCE(v_total_views, 0), COALESCE(v_unique_users, 0);
END;
$$;

-- 7. Mettre à jour les index
DROP INDEX IF EXISTS idx_page_counters_unique;
DROP INDEX IF EXISTS idx_unique_views_user_page;
DROP INDEX IF EXISTS idx_unique_views_page_lookup;
DROP INDEX IF EXISTS idx_page_counters_lookup;

CREATE UNIQUE INDEX IF NOT EXISTS idx_page_counters_page_id 
ON page_counters (page_id);

CREATE UNIQUE INDEX IF NOT EXISTS idx_unique_views_user_page_id 
ON unique_views (user_ip, page_id);

CREATE INDEX IF NOT EXISTS idx_unique_views_page_id 
ON unique_views (page_id);

-- 8. Créer une fonction de migration des données existantes
CREATE OR REPLACE FUNCTION migrate_existing_analytics_data()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN
  -- Migrer les identifiants de page
  INSERT INTO page_identifiers (type, slug, path)
  SELECT DISTINCT type, slug, path
  FROM (
    SELECT type, slug, path FROM page_counters
    UNION
    SELECT type, slug, path FROM unique_views
  ) t
  WHERE NOT EXISTS (
    SELECT 1 FROM page_identifiers pi 
    WHERE pi.type = t.type 
      AND (pi.slug = t.slug OR (pi.slug IS NULL AND t.slug IS NULL))
  );
  
  -- Mettre à jour les références dans page_counters
  UPDATE page_counters pc
  SET page_id = pi.id
  FROM page_identifiers pi
  WHERE pc.page_id IS NULL 
    AND pc.type = pi.type 
    AND (pc.slug = pi.slug OR (pc.slug IS NULL AND pi.slug IS NULL));
    
  -- Mettre à jour les références dans unique_views
  UPDATE unique_views uv
  SET page_id = pi.id
  FROM page_identifiers pi
  WHERE uv.page_id IS NULL 
    AND uv.type = pi.type 
    AND (uv.slug = pi.slug OR (uv.slug IS NULL AND pi.slug IS NULL));
END;
$$;

-- 9. Exécuter la migration des données
SELECT migrate_existing_analytics_data();

-- 10. Supprimer les colonnes obsolètes après la migration
-- (À décommenter après avoir vérifié que tout fonctionne correctement)
-- ALTER TABLE page_counters 
--   DROP COLUMN path,
--   DROP COLUMN type,
--   DROP COLUMN slug,
--   ALTER COLUMN page_id SET NOT NULL;
-- 
-- ALTER TABLE unique_views
--   DROP COLUMN path,
--   DROP COLUMN type,
--   DROP COLUMN slug,
--   ALTER COLUMN page_id SET NOT NULL;
