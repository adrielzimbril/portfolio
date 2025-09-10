-- Migration: Add product_id and requested_at to hub_product_requests
-- Date: 2025-09-10

-- Add the new columns
alter table public.hub_product_requests
  add column if not exists product_id text,
  add column if not exists requested_at timestamptz not null default now();

-- Create or replace the function to include the new fields
create or replace function public.add_hub_product_request(
  p_user_id uuid,
  p_product_id text,
  p_product_title text,
  p_product_type text,
  p_features text[],
  p_cover_image text,
  p_product_url text,
  p_custom_text text,
  p_subscribed_from_page text
)
returns uuid
language plpgsql
as $$
declare
  v_request_id uuid;
  v_user_email text;
  v_user_name text;
  v_user_phone text;
  v_user_id uuid;
begin
  -- Get or create user if user_id is provided
  if p_user_id is not null then
    select email, name, phone into v_user_email, v_user_name, v_user_phone
    from public.users
    where id = p_user_id;
    
    v_user_id := p_user_id;
  end if;

  -- Insert the product request with the new fields
  insert into public.hub_product_requests (
    user_id,
    email,
    name,
    phone,
    product_id,
    product_title,
    product_type,
    features,
    cover_image,
    product_url,
    custom_text,
    subscribed_from_page,
    requested_at
  ) values (
    v_user_id,
    v_user_email,
    v_user_name,
    v_user_phone,
    p_product_id,
    p_product_title,
    p_product_type,
    p_features,
    p_cover_image,
    p_product_url,
    p_custom_text,
    p_subscribed_from_page,
    now()
  )
  returning id into v_request_id;

  return v_request_id;
end;
$$;
