-- Delete View hub_product_requests_with_user for hub_product_requests with user data
DROP VIEW IF EXISTS hub_product_requests_with_user;

-- Delete View newsletter_subscribers_with_user for newsletter_subscribers with user data
DROP VIEW IF EXISTS newsletter_subscribers_with_user;

-- Correction of functions with column ambiguity

-- 1) Correction of the function add_newsletter_subscriber 
CREATE OR REPLACE FUNCTION public.add_newsletter_subscriber(
  p_user_id UUID DEFAULT NULL,
  p_subscribed_from_page TEXT DEFAULT NULL
)
RETURNS TABLE (id UUID, user_id UUID)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID := p_user_id;
  v_subscription_id UUID;
BEGIN
  -- Upsert (if duplicate, update the source)
  INSERT INTO public.newsletter_subscribers(id, user_id, subscribed_from_page, created_at)
  VALUES (gen_random_uuid(), v_user_id, p_subscribed_from_page, NOW())
  RETURNING id INTO v_subscription_id;

  -- If the upsert didn't return an ID, get the existing one
  IF v_subscription_id IS NULL THEN
      SELECT id INTO v_subscription_id 
      FROM newsletter_subscribers 
      WHERE user_id = v_user_id;
  END IF;

  RETURN QUERY SELECT v_subscription_id, v_user_id;
END;
$$;

-- 2) Correction of the function add_hub_product_request
CREATE OR REPLACE FUNCTION public.add_hub_product_request(
  p_user_id UUID DEFAULT NULL,
  p_product_id TEXT DEFAULT NULL,
  p_product_title TEXT DEFAULT NULL,
  p_product_type TEXT DEFAULT NULL,
  p_features TEXT[] DEFAULT NULL,
  p_cover TEXT DEFAULT NULL,
  p_product_url TEXT DEFAULT NULL,
  p_custom_text TEXT DEFAULT NULL,
  p_subscribed_from_page TEXT DEFAULT NULL
)
RETURNS TABLE (id UUID, user_id UUID)
LANGUAGE plpgsql
AS $$
DECLARE
  v_user_id UUID := p_user_id;
  v_result_id UUID;
BEGIN
  -- UPSERT on product_id
  INSERT INTO public.hub_product_requests (
    id,
    product_title,
    product_type,
    features,
    cover,
    product_url,
    custom_text,
    subscribed_from_page,
    user_id,
    product_id,
    created_at,
    requested_at
  )
  VALUES (
    gen_random_uuid(), 
    p_product_title,
    p_product_type,
    p_features,
    p_cover,
    p_product_url,
    p_custom_text,
    p_subscribed_from_page,
    v_user_id,
    p_product_id,
    NOW(),
    NOW()
  )
  RETURNING id
  INTO v_result_id;

  RETURN QUERY SELECT v_result_id, v_user_id;
END;
$$;