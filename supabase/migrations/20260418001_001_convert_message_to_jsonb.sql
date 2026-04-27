-- Convert message field from text to jsonb for multi-language support
-- Also remove the language column as it's now redundant (stored in JSON)

-- Step 1: Add a new temporary jsonb column
alter table public.community_wall
add column if not exists message_json jsonb;

-- Step 2: Migrate existing data from text to jsonb format
-- Convert existing messages to JSON format using the language field
update public.community_wall
set message_json = jsonb_build_object(
  coalesce(language, 'en'),
  message
)
where message_json is null;

-- Step 3: Drop the old text column
alter table public.community_wall
drop column if exists message;

-- Step 4: Rename the new column to message
alter table public.community_wall
rename column message_json to message;

-- Step 5: Add a check constraint to ensure message is a valid JSON object
alter table public.community_wall
add constraint message_is_json_object
check (jsonb_typeof(message) = 'object');

-- Step 6: Drop the language column (now redundant)
alter table public.community_wall
drop column if exists language;

-- Step 7: Drop the language index
drop index if exists community_wall_language_idx;

-- Step 8: Add a comment to document the new format
comment on column public.community_wall.message is 'Multi-language message stored as JSON object, e.g., {"en": "Hello", "fr": "Bonjour"}';

-- Step 9: Create an index on the message for faster queries (optional, for text search)
create index if not exists community_wall_message_gin_idx
on public.community_wall using gin (message);
