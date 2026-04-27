-- Migration: 004_normalize_user_references.sql
-- Date: 2025-09-06
-- Description: Normalize user references to avoid data duplication

-- STEP 1: Backup existing data before modification
-- Create temporary tables to backup data
CREATE TABLE temp_hub_product_requests AS 
SELECT * FROM hub_product_requests;

CREATE TABLE temp_newsletter_subscribers AS 
SELECT * FROM newsletter_subscribers;

-- Create index for performance
CREATE INDEX idx_hub_product_requests_user_id ON hub_product_requests(user_id);

-- STEP 3: Migrate existing data from hub_product_requests
-- Associate existing requests to users based on email
UPDATE hub_product_requests 
SET user_id = users.id 
FROM users 
WHERE hub_product_requests.email = users.email;

-- For requests without matching user, create users
INSERT INTO users (id, email, name, phone, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    hpr.email,
    hpr.name,
    hpr.phone,
    hpr.created_at,
    NOW()
FROM temp_hub_product_requests hpr
LEFT JOIN users u ON hpr.email = u.email
WHERE u.id IS NULL AND hpr.email IS NOT NULL;

-- Update user_id for newly created users
UPDATE hub_product_requests 
SET user_id = users.id 
FROM users 
WHERE hub_product_requests.email = users.email 
AND hub_product_requests.user_id IS NULL;

-- STEP 4: Remove redundant columns from hub_product_requests
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS email;
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS name;
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS phone;

-- Create index for performance
CREATE INDEX idx_newsletter_subscribers_user_id ON newsletter_subscribers(user_id);

-- STEP 6: Migrate existing data from newsletter_subscribers
-- Associate existing subscriptions to users based on email
UPDATE newsletter_subscribers 
SET user_id = users.id 
FROM users 
WHERE newsletter_subscribers.email = users.email;

-- For subscriptions without matching user, create users
INSERT INTO users (id, email, name, phone, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    ns.email,
    '',
    NULL,
    NOW(),
    NOW()
FROM temp_newsletter_subscribers ns
LEFT JOIN users u ON ns.email = u.email
WHERE u.id IS NULL AND ns.email IS NOT NULL;

-- Update user_id for newly created users
UPDATE newsletter_subscribers 
SET user_id = users.id 
FROM users 
WHERE newsletter_subscribers.email = users.email 
AND newsletter_subscribers.user_id IS NULL;

-- STEP 7: Remove redundant columns from newsletter_subscribers
ALTER TABLE newsletter_subscribers DROP COLUMN IF EXISTS email;
ALTER TABLE newsletter_subscribers DROP COLUMN IF EXISTS name;

-- STEP 8: Add NOT NULL constraints on user_id
-- Remove orphaned records if any remain
DELETE FROM hub_product_requests WHERE user_id IS NULL;
DELETE FROM newsletter_subscribers WHERE user_id IS NULL;

-- Make user_id mandatory
ALTER TABLE hub_product_requests ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE newsletter_subscribers ALTER COLUMN user_id SET NOT NULL;

-- STEP 9: Create views to facilitate queries
-- View for hub_product_requests with user data
CREATE OR REPLACE VIEW hub_product_requests_with_user AS
SELECT 
    hpr.id,
    hpr.product_title,
    hpr.product_type,
    hpr.features,
    hpr.cover_image,
    hpr.product_url,
    hpr.custom_text,
    hpr.subscribed_from_page,
    hpr.created_at,
    hpr.user_id,
    u.email,
    u.name,
    u.phone,
    u.created_at as user_created_at,
    u.updated_at as user_updated_at
FROM hub_product_requests hpr
JOIN users u ON hpr.user_id = u.id;

-- View for newsletter_subscribers with user data
CREATE OR REPLACE VIEW newsletter_subscribers_with_user AS
SELECT 
    ns.id,
    ns.subscribed_from_page,
    ns.created_at,
    ns.user_id,
    u.email,
    u.name,
    u.phone,
    u.created_at as user_created_at,
    u.updated_at as user_updated_at
FROM newsletter_subscribers ns
JOIN users u ON ns.user_id = u.id;

-- STEP 10: Create appropriate unique constraints
-- A user can only have one product request per type
CREATE UNIQUE INDEX idx_hub_product_requests_user_product 
ON hub_product_requests (user_id, product_type, product_title);

-- A user can only subscribe to the newsletter once
CREATE UNIQUE INDEX idx_newsletter_subscribers_unique_user 
ON newsletter_subscribers (user_id);

-- STEP 11: Clean up temporary tables
DROP TABLE temp_hub_product_requests;
DROP TABLE temp_newsletter_subscribers;

-- STEP 12: Create helper functions for insertions
CREATE OR REPLACE FUNCTION create_product_request(
    p_email TEXT,
    p_name TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_product_title TEXT DEFAULT NULL,
    p_product_type TEXT DEFAULT NULL,
    p_features TEXT DEFAULT NULL,
    p_cover TEXT DEFAULT NULL,
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
BEGIN
    -- Create or get user
    INSERT INTO users (id, email, name, phone, created_at, updated_at)
    VALUES (gen_random_uuid(), p_email, p_name, p_phone, NOW(), NOW())
    ON CONFLICT (email) 
    DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        phone = COALESCE(EXCLUDED.phone, users.phone),
        updated_at = NOW()
    RETURNING id INTO v_user_id;

    -- If upsert didn't return ID, get existing
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM users WHERE email = p_email;
    END IF;

    -- Create product request
    INSERT INTO hub_product_requests (
        id, user_id, product_title, product_type, features, 
        cover_image, product_url, custom_text, subscribed_from_page, created_at
    ) VALUES (
        gen_random_uuid(), v_user_id, p_product_title, p_product_type, p_features,
        p_cover, p_product_url, p_custom_text, p_subscribed_from_page, NOW()
    ) RETURNING id INTO v_request_id;

    RETURN v_request_id;
END;
$$;

CREATE OR REPLACE FUNCTION create_newsletter_subscription(
    p_email TEXT,
    p_name TEXT DEFAULT NULL,
    p_subscribed_from_page TEXT DEFAULT NULL
)
RETURNS UUID
LANGUAGE plpgsql
AS $$
DECLARE
    v_user_id UUID;
    v_subscription_id UUID;
BEGIN
    -- Create or get user
    INSERT INTO users (id, email, name, created_at, updated_at)
    VALUES (gen_random_uuid(), p_email, p_name, NOW(), NOW())
    ON CONFLICT (email) 
    DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        updated_at = NOW()
    RETURNING id INTO v_user_id;

    -- If upsert didn't return ID, get existing
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM users WHERE email = p_email;
    END IF;

    -- Create newsletter subscription
    INSERT INTO newsletter_subscribers (id, user_id, subscribed_from_page, created_at)
    VALUES (gen_random_uuid(), v_user_id, p_subscribed_from_page, NOW())
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO v_subscription_id;

    -- If no new ID, get existing
    IF v_subscription_id IS NULL THEN
        SELECT id INTO v_subscription_id 
        FROM newsletter_subscribers 
        WHERE user_id = v_user_id;
    END IF;

    RETURN v_subscription_id;
END;
$$;