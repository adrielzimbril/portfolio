-- Migration: Add product_id and requested_at to hub_product_requests
-- Date: 2025-09-10

-- Delete product_id and requested_at from hub_product_requests
ALTER TABLE public.hub_product_requests DROP COLUMN IF EXISTS productid;

-- 1) RPC to add newsletter subscriber with optional user_id
-- Drop the old function with the wrong signature
DROP FUNCTION IF EXISTS public.add_newsletter_subscriber(uuid, text, text, text, text);

-- Create the new function
CREATE OR REPLACE FUNCTION public.add_newsletter_subscriber(
  p_user_id uuid DEFAULT NULL,
  p_email text DEFAULT NULL,
  p_name text DEFAULT NULL,
  p_phone text DEFAULT NULL,
  p_subscribed_from_page text DEFAULT NULL
)
RETURNS TABLE (id bigint, user_id uuid)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id uuid := p_user_id;
  v_row public.newsletter_subscribers;
BEGIN
  IF v_user_id IS NULL THEN
    -- Create/find user if we have contact info
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  END IF;

  -- Upsert (if duplicate, update the source)
  INSERT INTO public.newsletter_subscribers(user_id, subscribed_from_page)
  VALUES (v_user_id, p_subscribed_from_page)
  ON CONFLICT (user_id) DO UPDATE
    SET subscribed_from_page = excluded.subscribed_from_page
  RETURNING * INTO v_row;

  RETURN QUERY SELECT v_row.id, v_row.user_id;
END;
$$;

-- 2) RPC to add hub product request with optional user_id
-- Drop the old version
DROP FUNCTION IF EXISTS public.add_hub_product_request cascade;

-- Create the fixed version
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
  v_result_id bigint;
  v_result_user_id uuid;
BEGIN
  -- Create or find user if not provided
  IF v_user_id IS NULL THEN
    v_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  END IF;

  -- UPSERT on product_id
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
  ON CONFLICT (user_id) DO UPDATE
    SET product_id         = EXCLUDED.product_id,
        product_title      = EXCLUDED.product_title,
        product_type       = EXCLUDED.product_type,
        features           = EXCLUDED.features,
        cover              = EXCLUDED.cover,
        product_url        = EXCLUDED.product_url,
        custom_text        = EXCLUDED.custom_text,
        subscribed_from_page = EXCLUDED.subscribed_from_page,
        requested_at       = NOW()
  RETURNING hub_product_requests.id, hub_product_requests.user_id
  INTO v_result_id, v_result_user_id;

  RETURN QUERY SELECT v_result_id, v_result_user_id;
END;
$$;