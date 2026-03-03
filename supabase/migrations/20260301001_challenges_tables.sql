create extension if not exists pgcrypto;

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

create unique index if not exists challenge_registrations_unique
  on public.challenge_registrations (challenge_slug, email);

create index if not exists challenge_registrations_challenge_idx
  on public.challenge_registrations (challenge_slug);

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
  winner_rank int,
  ip text,
  meta jsonb
);

create unique index if not exists challenge_submissions_unique
  on public.challenge_submissions (challenge_slug, email);

create index if not exists challenge_submissions_challenge_idx
  on public.challenge_submissions (challenge_slug);
