-- Add language field to community_wall table
alter table public.community_wall 
add column if not exists language text default 'en';

-- Add index for faster queries by language
create index if not exists community_wall_language_idx 
on public.community_wall(language);
