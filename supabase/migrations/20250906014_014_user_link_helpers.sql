-- Migration: helper triggers and RPCs to use user_id as source of truth
-- Date: 2025-09-07

-- 1) Ensure columns in child tables are nullable so we can omit when user_id is present
alter table if exists public.newsletter_subscribers
  alter column email drop not null;
alter table if exists public.hub_product_requests
  alter column email drop not null;

-- 2) Trigger function to fill email/name/phone from users when user_id is provided
create or replace function public.fill_contact_from_user()
returns trigger as $$
declare
  v_user record;
begin
  if new.user_id is not null then
    select id, name, email, phone into v_user from public.users where id = new.user_id;

    if v_user.id is not null then
      if coalesce(new.name, '') = '' then new.name := v_user.name; end if;
      if coalesce(new.email, '') = '' then new.email := v_user.email; end if;
      if coalesce(new.phone, '') = '' then new.phone := v_user.phone; end if;
    end if;
  end if;
  return new;
end;
$$ language plpgsql;

-- 3) Attach triggers on both tables
create trigger fill_newsletter_from_user
before insert or update on public.newsletter_subscribers
for each row execute function public.fill_contact_from_user();

create trigger fill_hubreq_from_user
before insert or update on public.hub_product_requests
for each row execute function public.fill_contact_from_user();

-- 4) RPC to add newsletter subscriber with optional user_id
create or replace function public.add_newsletter_subscriber(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_subscribed_from_page text default null
)
returns table (id bigint, user_id uuid)
language plpgsql
as $$
declare
  v_user_id uuid := p_user_id;
  v_row public.newsletter_subscribers;
begin
  if v_user_id is null then
    -- Create/find user if we have contact info
    v_user_id := public._get_or_create_user(p_name, p_email, p_phone);
  end if;

  -- Upsert by email if provided, else insert by user_id
  if p_email is not null then
    insert into public.newsletter_subscribers(email, name, phone, user_id, subscribed_from_page)
    values (p_email, p_name, p_phone, v_user_id, p_subscribed_from_page)
    on conflict (email)
    do update set
      name = coalesce(excluded.name, public.newsletter_subscribers.name),
      phone = coalesce(excluded.phone, public.newsletter_subscribers.phone),
      user_id = coalesce(excluded.user_id, public.newsletter_subscribers.user_id),
      subscribed_from_page = coalesce(excluded.subscribed_from_page, public.newsletter_subscribers.subscribed_from_page)
    returning * into v_row;
  else
    insert into public.newsletter_subscribers(email, name, phone, user_id, subscribed_from_page)
    values (null, p_name, p_phone, v_user_id, p_subscribed_from_page)
    returning * into v_row;
  end if;

  return query select v_row.id, v_row.user_id;
end;
$$;

-- 5) RPC to add hub product request with optional user_id
create or replace function public.add_hub_product_request(
  p_user_id uuid default null,
  p_email text default null,
  p_name text default null,
  p_phone text default null,
  p_product_title text default null,
  p_product_type text default null,
  p_features text[] default null,
  p_cover_image text default null,
  p_product_url text default null,
  p_custom_text text default null,
  p_subscribed_from_page text default null
)
returns table (id bigint, user_id uuid)
language plpgsql
as $$
declare
  v_user_id uuid := p_user_id;
  v_row public.hub_product_requests;
begin
  if v_user_id is null then
    v_user_id := public._get_or_create_user(p_name, p_email, p_phone);
  end if;

  insert into public.hub_product_requests(
    email, name, phone,
    product_title, product_type, features, cover_image, product_url, custom_text,
    subscribed_from_page, user_id
  ) values (
    p_email, p_name, p_phone,
    p_product_title, p_product_type, p_features, p_cover_image, p_product_url, p_custom_text,
    p_subscribed_from_page, v_user_id
  ) returning * into v_row;

  return query select v_row.id, v_row.user_id;
end;
$$;
