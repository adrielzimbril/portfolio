-- Activer RLS si ce n'est pas déjà fait
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Supprimer les policies existantes qui pourraient bloquer
DROP POLICY IF EXISTS page_views_insert_all ON public.page_views;

-- Créer une policy INSERT qui autorise toutes les lignes
CREATE POLICY page_views_insert_all
  ON public.page_views
  FOR INSERT
  WITH CHECK (true);  -- permet l'insertion de toutes les nouvelles lignes

-- Vérifier / recréer SELECT policy si besoin
DROP POLICY IF EXISTS page_views_select_all ON public.page_views;

CREATE POLICY page_views_select_all
  ON public.page_views
  FOR SELECT
  USING (true);  -- permet de lire toutes les lignes
