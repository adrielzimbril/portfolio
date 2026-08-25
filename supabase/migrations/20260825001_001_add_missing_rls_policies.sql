-- ═══════════════════════════════════════════════════════════════════════════════
-- Migration: Add missing RLS policies + fix Security Definer views
-- 
-- SAFETY: This migration ONLY adds new policies and alters view security mode.
--         It does NOT delete, drop, alter, or truncate any table, column, or data.
-- ═══════════════════════════════════════════════════════════════════════════════

-- ─────────────────────────────────────────────────────────────────────────────
-- 1. page_counters — RLS enabled but 0 policies (blocked all anon access)
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public read on page_counters"
  ON public.page_counters FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on page_counters"
  ON public.page_counters FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update on page_counters"
  ON public.page_counters FOR UPDATE
  USING (true)
  WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 2. unique_views — RLS enabled but 0 policies
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public read on unique_views"
  ON public.unique_views FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert on unique_views"
  ON public.unique_views FOR INSERT
  WITH CHECK (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 3. challenge_registrations — RLS enabled but 0 policies
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public insert on challenge_registrations"
  ON public.challenge_registrations FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read on challenge_registrations"
  ON public.challenge_registrations FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 4. challenge_submissions — RLS enabled but 0 policies
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public insert on challenge_submissions"
  ON public.challenge_submissions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read on challenge_submissions"
  ON public.challenge_submissions FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 5. submit_entries — RLS enabled but 0 policies
-- ─────────────────────────────────────────────────────────────────────────────
CREATE POLICY "Allow public insert on submit_entries"
  ON public.submit_entries FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public read on submit_entries"
  ON public.submit_entries FOR SELECT
  USING (true);

-- ─────────────────────────────────────────────────────────────────────────────
-- 6. Fix Security Definer views → Security Invoker
--    These views bypass RLS by default. Switching to security_invoker
--    makes them respect the caller's RLS policies.
-- ─────────────────────────────────────────────────────────────────────────────
ALTER VIEW public.hub_product_requests_with_user
  SET (security_invoker = on);

ALTER VIEW public.newsletter_subscribers_with_user
  SET (security_invoker = on);
