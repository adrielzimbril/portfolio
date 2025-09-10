-- Migration: Add product_id and requested_at to hub_product_requests
-- Date: 2025-09-10

-- 1) RPC to add newsletter subscriber with optional user_id
-- Drop the old function with the wrong signature
DROP FUNCTION IF EXISTS public.add_newsletter_subscriber(uuid, text, text, text, text);

-- Create the new function
CREATE OR REPLACE FUNCTION public.add_newsletter_subscriber(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_subscribed_from_page text default null
)
RETURNS TABLE (id bigint, user_id uuid)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid := p_user_id;
  v_row public.newsletter_subscribers;
BEGIN
  if v_user_id is null then
    -- Create/find user if we have contact info
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  end if;

  -- Upsert (if duplicate, update the source)
  insert into public.newsletter_subscribers(user_id, subscribed_from_page)
  values (v_user_id, p_subscribed_from_page)
  on conflict (user_id) do update
    set subscribed_from_page = excluded.subscribed_from_page
  returning * into v_row;

  return query select v_row.id, v_row.user_id;
END;
$$;

-- 2) RPC to add hub product request with optional user_id
-- Drop the old function with the wrong signature
DROP FUNCTION IF EXISTS public.add_hub_product_request(
  uuid, text, text, text, text, text, text, text[], text, text, text
);

-- Create the new function
CREATE OR REPLACE FUNCTION public.add_hub_product_request(
  p_user_id uuid DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_name text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_product_id text DEFAULT NULL,
  p_product_title text DEFAULT NULL,
  p_product_type text DEFAULT NULL,
  p_features text[] DEFAULT NULL,
  p_cover text DEFAULT NULL,
  p_product_url text DEFAULT NULL,
  p_custom_text text DEFAULT NULL,
  p_subscribed_from_page text DEFAULT NULL
)
RETURNS TABLE (id bigint, user_id uuid)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid := p_user_id;
  v_row public.hub_product_requests;
BEGIN
  -- Crée ou retrouve l’utilisateur si non fourni
  IF v_user_id IS NULL THEN
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  END IF;

  -- UPSERT sur product_id
  INSERT INTO public.hub_product_requests (
    product_title,
    product_type,
    features,
    cover,
    product_url,
    custom_text,
    subscribed_from_page,
    user_id,
    product_id
  )
  VALUES (
    p_product_title,
    p_product_type,
    p_features,
    p_cover,
    p_product_url,
    p_custom_text,
    p_subscribed_from_page,
    v_user_id,
    p_product_id
  )
  ON CONFLICT (product_id) DO UPDATE
    SET product_title       = EXCLUDED.product_title,
        product_type        = EXCLUDED.product_type,
        features            = EXCLUDED.features,
        cover               = EXCLUDED.cover,
        product_url         = EXCLUDED.product_url,
        custom_text         = EXCLUDED.custom_text,
        subscribed_from_page= EXCLUDED.subscribed_from_page,
        user_id             = EXCLUDED.user_id
  RETURNING * INTO v_row;

  RETURN QUERY SELECT v_row.id, v_row.user_id;
END;
$$;
