-- 1) RPC to add hub product request with optional user_id
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
  final_user_id uuid := p_user_id;
  result_id bigint;
  result_user_id uuid;
BEGIN
  -- Create or find user if not provided
  IF final_user_id IS NULL THEN
    final_user_id := public.get_or_create_user(p_name, p_email, p_phone);
  END IF;

  -- UPSERT on user_id (not product_id)
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
    final_user_id,
    p_product_id
  )
  RETURNING hub_product_requests.id, hub_product_requests.user_id
  INTO result_id, result_user_id;

  RETURN QUERY SELECT result_id, result_user_id;
END;
$$;