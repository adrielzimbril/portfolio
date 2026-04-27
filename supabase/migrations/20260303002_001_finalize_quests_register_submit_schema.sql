-- Final alignment for quests register/submit flows.
-- Safe to run on existing databases (idempotent).

create extension if not exists pgcrypto;

-- ----------------------------
-- challenge_registrations
-- Expected fields used by API:
-- id, created_at, challenge_slug, user_id, name, email, message, ip, meta
-- ----------------------------

create table if not exists public.challenge_registrations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  challenge_slug text not null,
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  email text not null,
  message text,
  ip text,
  meta jsonb
);

-- legacy migration support: motivation -> message
do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'challenge_registrations'
      and column_name = 'motivation'
  ) then
    if exists (
      select 1 from information_schema.columns
      where table_schema = 'public'
        and table_name = 'challenge_registrations'
        and column_name = 'message'
    ) then
      execute '
        update public.challenge_registrations
        set message = coalesce(message, motivation)
      ';
      execute 'alter table public.challenge_registrations drop column motivation';
    else
      execute 'alter table public.challenge_registrations rename column motivation to message';
    end if;
  end if;
end $$;

alter table if exists public.challenge_registrations
  add column if not exists message text;

alter table if exists public.challenge_registrations
  drop column if exists portfolio_url;

create unique index if not exists challenge_registrations_unique
  on public.challenge_registrations (challenge_slug, email);

create index if not exists challenge_registrations_challenge_idx
  on public.challenge_registrations (challenge_slug);

-- ----------------------------
-- challenge_submissions
-- Expected fields used by API:
-- id, created_at, challenge_slug, user_id, name, email, work_url, message,
-- status, is_public, ip, meta
-- ----------------------------

create table if not exists public.challenge_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  challenge_slug text not null,
  user_id uuid references public.users(id) on delete set null,
  name text not null,
  email text not null,
  work_url text not null,
  message text,
  status text not null default 'received',
  is_public boolean not null default false,
  ip text,
  meta jsonb
);

alter table if exists public.challenge_submissions
  add column if not exists work_url text;

alter table if exists public.challenge_submissions
  add column if not exists message text;

-- remove legacy columns no longer used by quests submit API
alter table if exists public.challenge_submissions
  drop column if exists work_title;
alter table if exists public.challenge_submissions
  drop column if exists portfolio_url;
alter table if exists public.challenge_submissions
  drop column if exists figma_url;
alter table if exists public.challenge_submissions
  drop column if exists poster_url;

-- enforce required work_url after alignment (only if existing data is valid)
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'challenge_submissions'
      and column_name = 'work_url'
  ) and not exists (
    select 1
    from public.challenge_submissions
    where work_url is null
  ) then
    execute 'alter table public.challenge_submissions alter column work_url set not null';
  end if;
end $$;

create unique index if not exists challenge_submissions_unique
  on public.challenge_submissions (challenge_slug, email);

create index if not exists challenge_submissions_challenge_idx
  on public.challenge_submissions (challenge_slug);

-- ----------------------------
-- newsletter_subscribers safeguards for upsert(user_id)
-- ----------------------------

alter table if exists public.newsletter_subscribers
  add column if not exists subscribed_from_page text;

alter table if exists public.newsletter_subscribers
  add column if not exists updateexisting boolean default false;

-- dedupe by user_id before unique index creation
with ranked as (
  select
    id,
    user_id,
    row_number() over (
      partition by user_id
      order by created_at desc, id desc
    ) as rn
  from public.newsletter_subscribers
  where user_id is not null
)
delete from public.newsletter_subscribers ns
using ranked r
where ns.id = r.id
  and r.rn > 1;

create unique index if not exists idx_newsletter_subscribers_user_id_unique
  on public.newsletter_subscribers(user_id)
  where user_id is not null;
