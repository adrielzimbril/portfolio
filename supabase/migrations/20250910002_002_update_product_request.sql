-- Migration: Update create_product_request to include product_id and requested_at
-- Date: 2025-09-10

-- First, add the new columns if they don't exist
alter table public.hub_product_requests
  add column if not exists product_id text,
  add column if not exists requested_at timestamptz not null default now();

-- Update the function to include the new fields
create or replace function public.create_product_request(
    p_email TEXT,
    p_name TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_product_id TEXT DEFAULT NULL,
    p_product_title TEXT DEFAULT NULL,
    p_product_type TEXT DEFAULT NULL,
    p_features TEXT DEFAULT NULL,
    p_cover_image TEXT DEFAULT NULL,
    p_product_url TEXT DEFAULT NULL,
    p_custom_text TEXT DEFAULT NULL,
    p_subscribed_from_page TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id UUID;
    v_request_id UUID;
    v_features_array TEXT[];
BEGIN
    -- Convert comma-separated features to array if not null
    IF p_features IS NOT NULL THEN
        v_features_array := string_to_array(p_features, ',');
    END IF;

    -- Create or get user
    INSERT INTO users (id, email, name, phone, created_at, updated_at)
    VALUES (gen_random_uuid(), p_email, p_name, p_phone, NOW(), NOW())
    ON CONFLICT (email) 
    DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        phone = COALESCE(EXCLUDED.phone, users.phone),
        updated_at = NOW()
    RETURNING id INTO v_user_id;

    -- If upsert didn't return an ID, get the existing one
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM users WHERE email = p_email;
    END IF;

    -- Create the product request with the new fields
    INSERT INTO hub_product_requests (
        id, user_id, product_id, product_title, product_type, 
        features, cover_image, product_url, custom_text, 
        subscribed_from_page, created_at, requested_at
    ) VALUES (
        gen_random_uuid(), 
        v_user_id, 
        p_product_id,
        p_product_title, 
        p_product_type, 
        v_features_array,
        p_cover_image, 
        p_product_url, 
        p_custom_text, 
        p_subscribed_from_page, 
        NOW(),
        NOW()
    ) RETURNING id INTO v_request_id;

    RETURN v_request_id;
END;
$$;
