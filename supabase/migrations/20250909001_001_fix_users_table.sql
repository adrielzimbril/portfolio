-- Add productId to hub_product_requests
ALTER TABLE hub_product_requests
ADD COLUMN productId VARCHAR(255) UNIQUE;

-- Add updateExisting to newsletter_subscribers
ALTER TABLE newsletter_subscribers
ADD COLUMN updateExisting BOOLEAN DEFAULT FALSE NOT NULL;
