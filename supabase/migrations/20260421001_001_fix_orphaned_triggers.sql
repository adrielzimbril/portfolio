-- Migration: Drop orphaned triggers causing 42703 error
-- Date: 2026-04-21 
-- Description: Drops triggers that were left over after name/email/phone columns were dropped in normalization.

DROP TRIGGER IF EXISTS fill_hubreq_from_user ON public.hub_product_requests;
DROP TRIGGER IF EXISTS fill_newsletter_from_user ON public.newsletter_subscribers;
