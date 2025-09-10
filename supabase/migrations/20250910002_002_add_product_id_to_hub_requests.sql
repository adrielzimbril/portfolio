-- Migration: Add product_id and requested_at to hub_product_requests
-- Date: 2025-09-10

-- Add the new columns
alter table public.hub_product_requests
  add column if not exists product_id text,
  add column if not exists requested_at timestamptz not null default now();

-- Rename the column cover_image -> cover
alter table public.hub_product_requests
  rename column cover_image to cover;

-- Drop the old functions
drop function if exists public.create_newsletter_subscription();
drop function if exists public.create_product_request();

-- 1) RPC to add newsletter subscriber with optional user_id
create or replace function public.add_newsletter_subscriber(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_subscribed_from_page text default null
)
returns table (id bigint, user_id uuid)
language plpgsql
as $$
declare
  v_user_id uuid := p_user_id;
  v_row public.newsletter_subscribers;
begin
  if v_user_id is null then
    -- Create/find user if we have contact info
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  end if;

  -- Upsert
  insert into public.newsletter_subscribers(user_id, subscribed_from_page)
  values (v_user_id, p_subscribed_from_page)
  returning * into v_row;

  return query select v_row.id, v_row.user_id;
end;
$$;

-- 2) RPC to add hub product request with optional user_id
create or replace function public.add_hub_product_request(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_product_id text default null,
  p_product_title text default null,
  p_product_type text default null,
  p_features text[] default null,
  p_cover_image text default null,
  p_product_url text default null,
  p_custom_text text default null,
  p_subscribed_from_page text default null
)
returns table (id bigint, user_id uuid)
language plpgsql
as $$
declare
  v_user_id uuid := p_user_id;
  v_row public.hub_product_requests;
begin
  if v_user_id is null then
    -- Create/find user if we have contact info
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  end if;

  -- Upsert
  insert into public.hub_product_requests(
    product_title, product_type, features, cover_image, product_url, custom_text,
    subscribed_from_page, user_id, product_id
  ) values (
    p_product_title, p_product_type, p_features, p_cover_image, p_product_url, p_custom_text,
    p_subscribed_from_page, v_user_id, p_product_id
  ) returning * into v_row;

  return query select v_row.id, v_row.user_id;
end;
$$;
