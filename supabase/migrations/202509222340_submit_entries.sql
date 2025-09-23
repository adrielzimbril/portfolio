-- UUID generator extension
create extension if not exists pgcrypto;

-- Create table to store submit form entries
create table if not exists public.submit_entries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  intention text not null,
  name text not null,
  email text not null,
  url text not null,
  description text,
  target text,
  meta jsonb,
  user_agent text,
  ip text,
  status text not null default 'received'
);

-- Useful indexes
create index if not exists idx_submit_entries_created_at on public.submit_entries (created_at desc);
create index if not exists idx_submit_entries_email on public.submit_entries (email);
create index if not exists idx_submit_entries_intention on public.submit_entries (intention);
