-- Migration pour nettoyer les anciennes colonnes après la migration

-- 1. Vérifier que toutes les données ont été migrées
DO $$
DECLARE
  v_missing_page_ids INTEGER;
BEGIN
  -- Vérifier s'il reste des enregistrements sans page_id
  SELECT COUNT(*) INTO v_missing_page_ids
  FROM page_counters
  WHERE page_id IS NULL;
  
  IF v_missing_page_ids > 0 THEN
    RAISE NOTICE 'Il reste % enregistrements sans page_id dans page_counters. Annulation du nettoyage.', v_missing_page_ids;
    RETURN;
  END IF;
  
  SELECT COUNT(*) INTO v_missing_page_ids
  FROM unique_views
  WHERE page_id IS NULL;
  
  IF v_missing_page_ids > 0 THEN
    RAISE NOTICE 'Il reste % enregistrements sans page_id dans unique_views. Annulation du nettoyage.', v_missing_page_ids;
    RETURN;
  END IF;
  
  -- Si on arrive ici, tout est bon, on peut procéder au nettoyage
  
  -- 2. Supprimer les contraintes et index inutiles
  ALTER TABLE page_counters 
    DROP CONSTRAINT IF EXISTS page_counters_path_type_slug_key,
    DROP CONSTRAINT IF EXISTS page_counters_pkey,
    DROP CONSTRAINT IF EXISTS page_counters_page_id_key;
    
  ALTER TABLE unique_views
    DROP CONSTRAINT IF EXISTS unique_views_pkey,
    DROP CONSTRAINT IF EXISTS unique_views_user_ip_path_type_slug_key;
    
  DROP INDEX IF EXISTS idx_page_counters_path_type_slug;
  DROP INDEX IF EXISTS idx_unique_views_user_ip_path_type_slug;
  
  -- 3. Renommer les colonnes pour les sauvegarder temporairement
  ALTER TABLE page_counters 
    RENAME COLUMN path TO deprecated_path,
    RENAME COLUMN type TO deprecated_type,
    RENAME COLUMN slug TO deprecated_slug;
    
  ALTER TABLE unique_views
    RENAME COLUMN path TO deprecated_path,
    RENAME COLUMN type TO deprecated_type,
    RENAME COLUMN slug TO deprecated_slug;
    
  -- 4. Recréer les contraintes de clé primaire
  ALTER TABLE page_counters 
    ADD PRIMARY KEY (page_id);
    
  ALTER TABLE unique_views 
    ADD PRIMARY KEY (id);
    
  -- 5. Créer un index sur page_id pour les performances
  CREATE INDEX IF NOT EXISTS idx_page_counters_page_id ON page_counters(page_id);
  CREATE INDEX IF NOT EXISTS idx_unique_views_page_id ON unique_views(page_id);
  
  -- 6. Vérifier que tout fonctionne toujours
  -- Cette partie peut être commentée une fois la migration validée
  -- et décommentée plus tard pour supprimer définitivement les anciennes colonnes
  /*
  -- 7. Supprimer les anciennes colonnes (à décommenter après vérification)
  ALTER TABLE page_counters 
    DROP COLUMN deprecated_path,
    DROP COLUMN deprecated_type,
    DROP COLUMN deprecated_slug;
    
  ALTER TABLE unique_views
    DROP COLUMN deprecated_path,
    DROP COLUMN deprecated_type,
    DROP COLUMN deprecated_slug;
  */
  
  RAISE NOTICE 'Nettoyage terminé avec succès. Les anciennes colonnes ont été renommées avec le préfixe "deprecated_".';
  
EXCEPTION WHEN OTHERS THEN
  RAISE WARNING 'Erreur lors du nettoyage: %', SQLERRM;
  RAISE WARNING 'Annulation des modifications...';
  
  -- Annuler les modifications en cas d'erreur
  ROLLBACK;
  
  -- Recréer les index et contraintes si nécessaire
  -- (ajoutez ici la recréation des index et contraintes si nécessaire)
  
  RAISE EXCEPTION 'Échec du nettoyage: %', SQLERRM;
END;
$$ LANGUAGE plpgsql;
