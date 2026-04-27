-- Migration: Add product_id and requested_at to hub_product_requests
-- Date: 2025-09-10

-- Add the new columns
alter table public.hub_product_requests
  add column if not exists product_id text,
  add column if not exists requested_at timestamptz not null default now();

-- Drop the old functions
drop function if exists public.create_newsletter_subscription();
drop function if exists public.create_product_request();

-- Create or replace the function to include the new fields
drop function if exists public.add_hub_product_request cascade;
create or replace function public.add_hub_product_request(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_product_id text default null,
  p_product_title text default null,
  p_product_type text default null,
  p_features text[] default null,
  p_cover text default null,
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
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  end if;

  insert into public.hub_product_requests(
    email, name, phone,
    product_title, product_type, features, cover, product_url, custom_text,
    subscribed_from_page, user_id, product_id
  ) values (
    p_email, p_name, p_phone,
    p_product_title, p_product_type, p_features, p_cover, p_product_url, p_custom_text,
    p_subscribed_from_page, v_user_id, p_product_id
  ) returning * into v_row;

  return query select v_row.id, v_row.user_id;
end;
$$;
