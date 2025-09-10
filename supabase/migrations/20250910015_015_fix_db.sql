
-- Step 01: Create appropriate unique constraints
-- A user can only have one product request per type, title and date so drop the old and create new
DROP INDEX IF EXISTS idx_hub_product_requests_user_product;
CREATE UNIQUE INDEX idx_hub_product_requests_user_product 
ON hub_product_requests (user_id, product_type, product_title, requested_at);

-- Step 02: Drop all unadapted table constraints
DROP INDEX IF EXISTS users_phone_unique_idx;
