-- Update reactions table to support anonymous users

-- 1. Add anonymous_id column for non-authenticated users
ALTER TABLE reactions 
ADD COLUMN IF NOT EXISTS anonymous_id TEXT;

-- 2. Make user_id nullable to support anonymous reactions
ALTER TABLE reactions 
ALTER COLUMN user_id DROP NOT NULL;

-- 3. Add constraint to ensure either user_id or anonymous_id is provided
ALTER TABLE reactions 
ADD CONSTRAINT reactions_user_or_anonymous CHECK (
  (user_id IS NOT NULL AND anonymous_id IS NULL) OR 
  (user_id IS NULL AND anonymous_id IS NOT NULL)
);

-- 4. Update unique constraint to handle anonymous users
ALTER TABLE reactions 
DROP CONSTRAINT IF EXISTS reactions_page_type_entity_id_user_id_reaction_type_key;

CREATE UNIQUE INDEX reactions_unique_reaction 
ON reactions(page_type, entity_id, COALESCE(user_id::text, anonymous_id), reaction_type);

-- 5. Update RLS policies to allow public reactions
DROP POLICY IF EXISTS "Allow authenticated insert on reactions" ON reactions;
DROP POLICY IF EXISTS "Allow authenticated delete own on reactions" ON reactions;

CREATE POLICY "Allow public insert on reactions" ON reactions
  FOR INSERT WITH CHECK (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND anonymous_id IS NOT NULL)
  );

CREATE POLICY "Allow delete own reactions" ON reactions
  FOR DELETE USING (
    (auth.uid() IS NOT NULL AND auth.uid() = user_id) OR
    (auth.uid() IS NULL AND anonymous_id IS NOT NULL)
  );

-- 6. Add index for anonymous_id
CREATE INDEX IF NOT EXISTS reactions_anonymous_id_idx ON reactions(anonymous_id);
