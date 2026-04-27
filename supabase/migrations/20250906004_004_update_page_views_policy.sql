-- Enable RLS if not already done
ALTER TABLE public.page_views ENABLE ROW LEVEL SECURITY;

-- Remove existing policies that might block
DROP POLICY IF EXISTS page_views_insert_all ON public.page_views;

-- Create an INSERT policy that allows all rows
CREATE POLICY page_views_insert_all
  ON public.page_views
  FOR INSERT
  WITH CHECK (true);  -- allows insertion of all new rows

-- Check / recreate SELECT policy if needed
DROP POLICY IF EXISTS page_views_select_all ON public.page_views;

CREATE POLICY page_views_select_all
  ON public.page_views
  FOR SELECT
  USING (true);  -- allows reading all rows

-- Allow UPDATE
DROP POLICY IF EXISTS page_views_update_all ON public.page_views;
CREATE POLICY page_views_update_all
  ON public.page_views
  FOR UPDATE
  USING (true)
  WITH CHECK (true);
