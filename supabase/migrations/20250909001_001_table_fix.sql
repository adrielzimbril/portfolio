-- Ajout de productId dans hub_product_requests
ALTER TABLE hub_product_requests
ADD COLUMN productId VARCHAR(255) UNIQUE;

-- Ajout de updateExisting dans newsletter_subscribers
ALTER TABLE newsletter_subscribers
ADD COLUMN updateExisting BOOLEAN DEFAULT FALSE NOT NULL;
