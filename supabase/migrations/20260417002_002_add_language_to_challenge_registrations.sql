-- Add language field to challenge_registrations table
alter table public.challenge_registrations 
add column if not exists language text default 'en';

-- Add index for faster queries by language
create index if not exists challenge_registrations_language_idx 
on public.challenge_registrations(language);
