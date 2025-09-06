-- Autoriser INSERT
DROP POLICY IF EXISTS page_views_insert_all ON public.page_views;
CREATE POLICY page_views_insert_all
  ON public.page_views
  FOR INSERT
  WITH CHECK (true);

-- Autoriser UPDATE
DROP POLICY IF EXISTS page_views_update_all ON public.page_views;
CREATE POLICY page_views_update_all
  ON public.page_views
  FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- Autoriser SELECT
DROP POLICY IF EXISTS page_views_select_all ON public.page_views;
CREATE POLICY page_views_select_all
  ON public.page_views
  FOR SELECT
  USING (true);
