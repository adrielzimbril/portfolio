-- Create reaction tables for thoughts, projects, connections, quests, and hub

-- Thoughts reactions
CREATE TABLE IF NOT EXISTS thought_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(slug, user_id, reaction_type)
);

-- Projects reactions
CREATE TABLE IF NOT EXISTS project_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(project_id, user_id, reaction_type)
);

-- Connections reactions
CREATE TABLE IF NOT EXISTS connection_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  connection_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(connection_id, user_id, reaction_type)
);

-- Quests reactions
CREATE TABLE IF NOT EXISTS quest_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  quest_id TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(quest_id, user_id, reaction_type)
);

-- Hub reactions
CREATE TABLE IF NOT EXISTS hub_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(slug, user_id, reaction_type)
);

-- Changelog reactions
CREATE TABLE IF NOT EXISTS changelog_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  version TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(version, user_id, reaction_type)
);

-- Enable RLS
ALTER TABLE thought_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE project_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE connection_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quest_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE hub_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE changelog_reactions ENABLE ROW LEVEL SECURITY;

-- Policies for thought_reactions
CREATE POLICY "Allow public read on thought_reactions" ON thought_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on thought_reactions" ON thought_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on thought_reactions" ON thought_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for project_reactions
CREATE POLICY "Allow public read on project_reactions" ON project_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on project_reactions" ON project_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on project_reactions" ON project_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for connection_reactions
CREATE POLICY "Allow public read on connection_reactions" ON connection_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on connection_reactions" ON connection_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on connection_reactions" ON connection_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for quest_reactions
CREATE POLICY "Allow public read on quest_reactions" ON quest_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on quest_reactions" ON quest_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on quest_reactions" ON quest_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for hub_reactions
CREATE POLICY "Allow public read on hub_reactions" ON hub_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on hub_reactions" ON hub_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on hub_reactions" ON hub_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Policies for changelog_reactions
CREATE POLICY "Allow public read on changelog_reactions" ON changelog_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow authenticated insert on changelog_reactions" ON changelog_reactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow authenticated delete own on changelog_reactions" ON changelog_reactions
  FOR DELETE USING (auth.uid() = user_id);

-- Indexes
CREATE INDEX IF NOT EXISTS thought_reactions_slug_idx ON thought_reactions(slug);
CREATE INDEX IF NOT EXISTS thought_reactions_user_id_idx ON thought_reactions(user_id);
CREATE INDEX IF NOT EXISTS project_reactions_project_id_idx ON project_reactions(project_id);
CREATE INDEX IF NOT EXISTS project_reactions_user_id_idx ON project_reactions(user_id);
CREATE INDEX IF NOT EXISTS connection_reactions_connection_id_idx ON connection_reactions(connection_id);
CREATE INDEX IF NOT EXISTS connection_reactions_user_id_idx ON connection_reactions(user_id);
CREATE INDEX IF NOT EXISTS quest_reactions_quest_id_idx ON quest_reactions(quest_id);
CREATE INDEX IF NOT EXISTS quest_reactions_user_id_idx ON quest_reactions(user_id);
CREATE INDEX IF NOT EXISTS hub_reactions_slug_idx ON hub_reactions(slug);
CREATE INDEX IF NOT EXISTS hub_reactions_user_id_idx ON hub_reactions(user_id);
CREATE INDEX IF NOT EXISTS changelog_reactions_version_idx ON changelog_reactions(version);
CREATE INDEX IF NOT EXISTS changelog_reactions_user_id_idx ON changelog_reactions(user_id);
