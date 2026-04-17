-- Add language field to challenge_submissions table
alter table public.challenge_submissions 
add column if not exists language text default 'en';

-- Add index for faster queries by language
create index if not exists challenge_submissions_language_idx 
on public.challenge_submissions(language);
