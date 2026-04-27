-- Create single reactions table for all content types with page_type and entity_id

CREATE TABLE IF NOT EXISTS reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  page_type TEXT NOT NULL CHECK (page_type IN ('thoughts', 'projects', 'connections', 'quests', 'hub', 'changelog')),
  entity_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful', 'sceptic')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(page_type, entity_id, user_id, reaction_type)
);

-- Enable RLS
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;

-- Policies for reactions
CREATE POLICY "Allow public read on reactions" ON reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on reactions" ON reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on reactions" ON reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS reactions_page_type_idx ON reactions(page_type);
CREATE INDEX IF NOT EXISTS reactions_entity_id_idx ON reactions(entity_id);
CREATE INDEX IF NOT EXISTS reactions_user_id_idx ON reactions(user_id);
CREATE INDEX IF NOT EXISTS reactions_composite_idx ON reactions(page_type, entity_id);
CREATE INDEX IF NOT EXISTS reactions_composite_user_idx ON reactions(page_type, entity_id, user_id);
