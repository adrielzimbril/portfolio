-- Drop existing primary key
alter table if exists public.page_views
  drop constraint if exists page_views_pkey;

-- Add new columns
alter table if exists public.page_views
  add column if not exists type text not null default 'page',
  add column if not exists slug text default '',
  add column if not exists details jsonb;

-- Normalize slug values
update public.page_views set slug = '' where slug is null;

-- Ensure slug is never null
alter table if exists public.page_views
  alter column slug set not null;

-- Create new composite primary key
alter table if exists public.page_views
  add primary key (path, type, slug);

-- Recreate index for path lookups
create index if not exists page_views_path_idx on public.page_views (path);
