-- Align challenge tables with current quests register/submit API payloads.
-- Register payload: { name, email, message }
-- Submit payload:   { name, email, work_url, message }

-- challenge_registrations: motivation -> message, remove legacy portfolio_url
do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'challenge_registrations'
      and column_name = 'motivation'
  ) then
    if exists (
      select 1
      from information_schema.columns
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

-- challenge_submissions: keep only work_url + message from current form
alter table if exists public.challenge_submissions
  add column if not exists message text;

alter table if exists public.challenge_submissions
  drop column if exists work_title;

alter table if exists public.challenge_submissions
  drop column if exists portfolio_url;

alter table if exists public.challenge_submissions
  drop column if exists figma_url;

alter table if exists public.challenge_submissions
  drop column if exists poster_url;
