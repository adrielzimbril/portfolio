-- Migration: 004_normalize_user_references.sql
-- Date: 2025-09-06
-- Description: Normalisation des références utilisateur pour éviter la duplication de données

-- ÉTAPE 1: Sauvegarder les données existantes avant la modification
-- Créer des tables temporaires pour sauvegarder les données
CREATE TABLE temp_hub_product_requests AS 
SELECT * FROM hub_product_requests;

CREATE TABLE temp_newsletter_subscribers AS 
SELECT * FROM newsletter_subscribers;

-- ÉTAPE 2: Modifier la structure de hub_product_requests
-- Ajouter la colonne user_id avant de supprimer les autres
ALTER TABLE hub_product_requests 
ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Créer un index pour les performances
CREATE INDEX idx_hub_product_requests_user_id ON hub_product_requests(user_id);

-- ÉTAPE 3: Migrer les données existantes de hub_product_requests
-- Associer les demandes existantes aux utilisateurs basés sur l'email
UPDATE hub_product_requests 
SET user_id = users.id 
FROM users 
WHERE hub_product_requests.email = users.email;

-- Pour les demandes sans utilisateur correspondant, créer des utilisateurs
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
WHERE u.id IS NULL AND hpr.email IS NOT NULL
ON CONFLICT (email) DO NOTHING;

-- Mettre à jour les user_id pour les nouveaux utilisateurs créés
UPDATE hub_product_requests 
SET user_id = users.id 
FROM users 
WHERE hub_product_requests.email = users.email 
AND hub_product_requests.user_id IS NULL;

-- ÉTAPE 4: Supprimer les colonnes redondantes de hub_product_requests
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS email;
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS name;
ALTER TABLE hub_product_requests DROP COLUMN IF EXISTS phone;

-- ÉTAPE 5: Modifier la structure de newsletter_subscribers
-- Ajouter la colonne user_id
ALTER TABLE newsletter_subscribers 
ADD COLUMN user_id UUID REFERENCES users(id) ON DELETE CASCADE;

-- Créer un index pour les performances
CREATE INDEX idx_newsletter_subscribers_user_id ON newsletter_subscribers(user_id);

-- ÉTAPE 6: Migrer les données existantes de newsletter_subscribers
-- Associer les abonnements existants aux utilisateurs basés sur l'email
UPDATE newsletter_subscribers 
SET user_id = users.id 
FROM users 
WHERE newsletter_subscribers.email = users.email;

-- Pour les abonnements sans utilisateur correspondant, créer des utilisateurs
INSERT INTO users (id, email, name, phone, created_at, updated_at)
SELECT 
    gen_random_uuid(),
    ns.email,
    COALESCE(ns.name, 'Newsletter Subscriber'),
    NULL,
    NOW(),
    NOW()
FROM temp_newsletter_subscribers ns
LEFT JOIN users u ON ns.email = u.email
WHERE u.id IS NULL AND ns.email IS NOT NULL
ON CONFLICT (email) DO NOTHING;

-- Mettre à jour les user_id pour les nouveaux utilisateurs créés
UPDATE newsletter_subscribers 
SET user_id = users.id 
FROM users 
WHERE newsletter_subscribers.email = users.email 
AND newsletter_subscribers.user_id IS NULL;

-- ÉTAPE 7: Supprimer les colonnes redondantes de newsletter_subscribers
ALTER TABLE newsletter_subscribers DROP COLUMN IF EXISTS email;
ALTER TABLE newsletter_subscribers DROP COLUMN IF EXISTS name;

-- ÉTAPE 8: Ajouter des contraintes NOT NULL sur les user_id
-- Supprimer les enregistrements orphelins s'il en reste
DELETE FROM hub_product_requests WHERE user_id IS NULL;
DELETE FROM newsletter_subscribers WHERE user_id IS NULL;

-- Rendre user_id obligatoire
ALTER TABLE hub_product_requests ALTER COLUMN user_id SET NOT NULL;
ALTER TABLE newsletter_subscribers ALTER COLUMN user_id SET NOT NULL;

-- ÉTAPE 9: Créer des vues pour faciliter les requêtes
-- Vue pour hub_product_requests avec les données utilisateur
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

-- Vue pour newsletter_subscribers avec les données utilisateur
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

-- ÉTAPE 10: Créer des contraintes uniques appropriées
-- Un utilisateur ne peut avoir qu'une seule demande de produit par type
CREATE UNIQUE INDEX idx_hub_product_requests_user_product 
ON hub_product_requests (user_id, product_type, product_title);

-- Un utilisateur ne peut s'abonner qu'une fois à la newsletter
CREATE UNIQUE INDEX idx_newsletter_subscribers_unique_user 
ON newsletter_subscribers (user_id);

-- ÉTAPE 11: Nettoyer les tables temporaires
DROP TABLE temp_hub_product_requests;
DROP TABLE temp_newsletter_subscribers;

-- ÉTAPE 12: Créer des fonctions helper pour les insertions
CREATE OR REPLACE FUNCTION create_product_request(
    p_email TEXT,
    p_name TEXT DEFAULT NULL,
    p_phone TEXT DEFAULT NULL,
    p_product_title TEXT,
    p_product_type TEXT,
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
BEGIN
    -- Créer ou récupérer l'utilisateur
    INSERT INTO users (id, email, name, phone, created_at, updated_at)
    VALUES (gen_random_uuid(), p_email, p_name, p_phone, NOW(), NOW())
    ON CONFLICT (email) 
    DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        phone = COALESCE(EXCLUDED.phone, users.phone),
        updated_at = NOW()
    RETURNING id INTO v_user_id;

    -- Si l'upsert n'a pas retourné d'ID, récupérer l'existant
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM users WHERE email = p_email;
    END IF;

    -- Créer la demande de produit
    INSERT INTO hub_product_requests (
        id, user_id, product_title, product_type, features, 
        cover_image, product_url, custom_text, subscribed_from_page, created_at
    ) VALUES (
        gen_random_uuid(), v_user_id, p_product_title, p_product_type, p_features,
        p_cover_image, p_product_url, p_custom_text, p_subscribed_from_page, NOW()
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
    -- Créer ou récupérer l'utilisateur
    INSERT INTO users (id, email, name, created_at, updated_at)
    VALUES (gen_random_uuid(), p_email, p_name, NOW(), NOW())
    ON CONFLICT (email) 
    DO UPDATE SET 
        name = COALESCE(EXCLUDED.name, users.name),
        updated_at = NOW()
    RETURNING id INTO v_user_id;

    -- Si l'upsert n'a pas retourné d'ID, récupérer l'existant
    IF v_user_id IS NULL THEN
        SELECT id INTO v_user_id FROM users WHERE email = p_email;
    END IF;

    -- Créer l'abonnement newsletter
    INSERT INTO newsletter_subscribers (id, user_id, subscribed_from_page, created_at)
    VALUES (gen_random_uuid(), v_user_id, p_subscribed_from_page, NOW())
    ON CONFLICT (user_id) DO NOTHING
    RETURNING id INTO v_subscription_id;

    -- Si pas de nouvel ID, récupérer l'existant
    IF v_subscription_id IS NULL THEN
        SELECT id INTO v_subscription_id 
        FROM newsletter_subscribers 
        WHERE user_id = v_user_id;
    END IF;

    RETURN v_subscription_id;
END;
$$;