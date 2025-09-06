-- Drop existing primary key
alter table if exists public.page_views
  drop constraint if exists page_views_pkey;

-- Add new columns
alter table if exists public.page_views
  add column if not exists ip text not null default 'unknown';


-- Create new composite primary key
alter table if exists public.page_views
  add primary key (path, type, slug, ip);

-- Recreate index for path lookups
create index if not exists page_views_path_idx on public.page_views (path);
