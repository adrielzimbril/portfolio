-- Enable extension for gen_random_uuid
create extension if not exists pgcrypto;

-- 1) Newsletter subscribers
create table if not exists public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text unique, -- unicité directe ici
  subscribed_from_page text null,
  created_at timestamptz not null default now()
);

-- 2) Page views table for view counters
create table if not exists public.page_views (
  path text primary key,
  count integer not null default 0,
  updated_at timestamptz not null default now()
);

alter table public.page_views enable row level security;

-- Allow public select
do $$ begin
  if not exists(
    select 1
    from pg_policies
    where policyname = 'page_views_select_all'
      and tablename = 'page_views'
      and schemaname = 'public'
  ) then
    create policy page_views_select_all
      on public.page_views
      for select using (true);
  end if;
end $$;

-- Allow public insert/upsert
do $$ begin
  if not exists(
    select 1
    from pg_policies
    where policyname = 'page_views_insert_all'
      and tablename = 'page_views'
      and schemaname = 'public'
  ) then
    create policy page_views_insert_all
      on public.page_views
      for insert with check (true);
  end if;
end $$;


-- 3) Hub product requests table
create table if not exists public.hub_product_requests (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  name text,
  phone text,
  product_title text not null,
  product_type text,
  features text[] null,
  cover_image text null,
  product_url text null,
  custom_text text null,
  subscribed_from_page text null,
  created_at timestamptz not null default now()
);

alter table public.hub_product_requests enable row level security;

-- Allow public select
do $$ begin
  if not exists(
    select 1 from pg_policies
    where policyname = 'hub_product_requests_select_all'
      and tablename = 'hub_product_requests'
      and schemaname = 'public'
  ) then
    create policy hub_product_requests_select_all
      on public.hub_product_requests
      for select using (true);
  end if;
end $$;

-- Allow public insert (API routes use anon key)
do $$ begin
  if not exists(
    select 1 from pg_policies
    where policyname = 'hub_product_requests_insert_all'
      and tablename = 'hub_product_requests'
      and schemaname = 'public'
  ) then
    create policy hub_product_requests_insert_all
      on public.hub_product_requests
      for insert with check (true);
  end if;
end $$;