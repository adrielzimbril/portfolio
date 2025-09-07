-- Migration: users table and link to newsletter_subscribers and hub_product_requests
-- Date: 2025-09-07

-- Ensure required extensions
create extension if not exists pgcrypto;

-- 1) Users table
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text null,
  email text null,
  phone text null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Unique constraints (nullable-safe)
create unique index if not exists users_email_unique_idx on public.users (lower(email)) where email is not null;
create unique index if not exists users_phone_unique_idx on public.users (phone) where phone is not null;

-- Updated at trigger
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_users_updated_at
before update on public.users
for each row execute function public.set_updated_at();

-- 2) Add user_id column to newsletter_subscribers and hub_product_requests
-- Assuming these tables already exist
alter table if exists public.newsletter_subscribers
  add column if not exists user_id uuid null;

alter table if exists public.hub_product_requests
  add column if not exists user_id uuid null;

-- 3) Backfill user_id by matching on email or phone
-- Create helper function to get or create a user and return id (same logic as RPC below)
create or replace function public._get_or_create_user(p_name text, p_email text, p_phone text)
returns uuid
language plpgsql
as $$
declare
  v_user_id uuid;
  v_email text := nullif(trim(p_email), '');
  v_phone text := nullif(trim(p_phone), '');
begin
  -- Try find by email first
  if v_email is not null then
    select u.id into v_user_id from public.users u where lower(u.email) = lower(v_email) limit 1;
  end if;

  -- If not found, try by phone
  if v_user_id is null and v_phone is not null then
    select u.id into v_user_id from public.users u where u.phone = v_phone limit 1;
  end if;

  -- Create if still not found
  if v_user_id is null then
    insert into public.users(name, email, phone)
    values (p_name, v_email, v_phone)
    returning id into v_user_id;
  else
    -- Optionally upsert missing name/email/phone
    update public.users
    set
      name = coalesce(public.users.name, p_name),
      email = coalesce(public.users.email, v_email),
      phone = coalesce(public.users.phone, v_phone)
    where id = v_user_id;
  end if;

  return v_user_id;
end;
$$;

-- Backfill newsletter_subscribers
-- Try to infer name/phone/email column names; adapt to your schema
-- Expecting columns: email, name (or nom), phone (or numero)
-- Use COALESCE for compatibility
update public.newsletter_subscribers ns
set user_id = public._get_or_create_user(
  '',
  ns.email,
  ''
)
where ns.user_id is null
  and (ns.email is not null);

-- Backfill hub_product_requests similarly
update public.hub_product_requests hpr
set user_id = public._get_or_create_user(
  hpr.name,
  hpr.email,
  hpr.phone
)
where hpr.user_id is null
  and (hpr.email is not null);

-- 4) Add foreign keys
alter table if exists public.newsletter_subscribers
  add constraint newsletter_subscribers_user_id_fkey
  foreign key (user_id) references public.users(id)
  on update cascade on delete set null;

alter table if exists public.hub_product_requests
  add constraint hub_product_requests_user_id_fkey
  foreign key (user_id) references public.users(id)
  on update cascade on delete set null;

-- 5) RPC: upsert_user(name, email, phone) -> users
create or replace function public.upsert_user(
  p_name text,
  p_email text,
  p_phone text
)
returns public.users
language plpgsql
as $$
declare
  v_user public.users;
  v_email text := nullif(trim(p_email), '');
  v_phone text := nullif(trim(p_phone), '');
  v_id uuid;
begin
  v_id := public._get_or_create_user(p_name, v_email, v_phone);

  update public.users
  set
    name = coalesce(p_name, name),
    email = coalesce(v_email, email),
    phone = coalesce(v_phone, phone)
  where id = v_id
  returning * into v_user;

  return v_user;
end;
$$;

-- 6) RPC: merge_users(source_id, target_id)
-- Moves references then deletes source
create or replace function public.merge_users(
  p_source uuid,
  p_target uuid
)
returns void
language plpgsql
as $$
begin
  if p_source = p_target then
    return;
  end if;

  -- Move child rows
  update public.newsletter_subscribers set user_id = p_target where user_id = p_source;
  update public.hub_product_requests set user_id = p_target where user_id = p_source;
  update public.unique_views set user_ip = user_ip where 1=1; -- no-op placeholder if you want to track by user later

  -- Optionally merge user fields
  update public.users t
  set
    name = coalesce(t.name, s.name),
    email = coalesce(t.email, s.email),
    phone = coalesce(t.phone, s.phone)
  from public.users s
  where t.id = p_target and s.id = p_source;

  -- Delete source
  delete from public.users where id = p_source;
end;
$$;

-- 7) Convenience RPCs to link rows after-the-fact
create or replace function public.link_newsletter_to_user(p_newsletter_id uuid, p_user_id uuid)
returns void language sql as $$
  update public.newsletter_subscribers set user_id = p_user_id where id = p_newsletter_id;
$$;

create or replace function public.link_hub_request_to_user(p_request_id uuid, p_user_id uuid)
returns void language sql as $$
  update public.hub_product_requests set user_id = p_user_id where id = p_request_id;
$$;

-- 8) RLS policies (simple open policies, adjust for your needs)
alter table public.users enable row level security;
DROP POLICY IF EXISTS users_select_all ON public.users;
CREATE POLICY users_select_all ON public.users FOR SELECT USING (true);
DROP POLICY IF EXISTS users_insert_all ON public.users;
CREATE POLICY users_insert_all ON public.users FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS users_update_all ON public.users;
CREATE POLICY users_update_all ON public.users FOR UPDATE USING (true) WITH CHECK (true);

-- Optional RLS on child tables if not already present
alter table if exists public.newsletter_subscribers enable row level security;

DROP POLICY IF EXISTS newsletter_select_all ON public.newsletter_subscribers;
CREATE POLICY newsletter_select_all ON public.newsletter_subscribers FOR SELECT USING (true);
DROP POLICY IF EXISTS newsletter_insert_all ON public.newsletter_subscribers;
CREATE POLICY newsletter_insert_all ON public.newsletter_subscribers FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS newsletter_update_all ON public.newsletter_subscribers;
CREATE POLICY newsletter_update_all ON public.newsletter_subscribers FOR UPDATE USING (true) WITH CHECK (true);

alter table if exists public.hub_product_requests enable row level security;
DROP POLICY IF EXISTS hubreq_select_all ON public.hub_product_requests;
CREATE POLICY hubreq_select_all ON public.hub_product_requests FOR SELECT USING (true);
DROP POLICY IF EXISTS hubreq_insert_all ON public.hub_product_requests;
CREATE POLICY hubreq_insert_all ON public.hub_product_requests FOR INSERT WITH CHECK (true);
DROP POLICY IF EXISTS hubreq_update_all ON public.hub_product_requests;
CREATE POLICY hubreq_update_all ON public.hub_product_requests FOR UPDATE USING (true) WITH CHECK (true);
