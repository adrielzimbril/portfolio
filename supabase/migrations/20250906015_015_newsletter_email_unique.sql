-- Migration: ensure unique index on newsletter_subscribers.email for ON CONFLICT(email)
-- Date: 2025-09-07

-- Make sure email is nullable (handled in previous migration),
-- here we just create a partial unique index so nulls are allowed.
create unique index if not exists uq_newsletter_subscribers_email
on public.newsletter_subscribers (lower(email))
where email is not null;
