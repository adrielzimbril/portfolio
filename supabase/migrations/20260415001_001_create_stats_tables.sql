-- Migration to create tables for statistics
-- To be executed manually in Supabase SQL Editor

-- Table for storing article views
CREATE TABLE IF NOT EXISTS thought_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  view_count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table for storing article reactions
CREATE TABLE IF NOT EXISTS thought_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(slug, reaction_type)
);

-- Table for storing community wall messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for performance optimization
CREATE INDEX IF NOT EXISTS thought_views_slug_idx ON thought_views(slug);
CREATE INDEX IF NOT EXISTS thought_reactions_slug_idx ON thought_reactions(slug);
CREATE INDEX IF NOT EXISTS thought_reactions_type_idx ON thought_reactions(reaction_type);

-- Function to increment view counter
CREATE OR REPLACE FUNCTION increment_thought_view(slug_param TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO thought_views (slug, view_count)
  VALUES (slug_param, 1)
  ON CONFLICT (slug) DO UPDATE SET
    view_count = thought_views.view_count + 1,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Function to increment reaction counter
CREATE OR REPLACE FUNCTION increment_thought_reaction(slug_param TEXT, reaction_type_param TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO thought_reactions (slug, reaction_type, count)
  VALUES (slug_param, reaction_type_param, 1)
  ON CONFLICT (slug, reaction_type) DO UPDATE SET
    count = thought_reactions.count + 1,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Function to increment message counter
CREATE OR REPLACE FUNCTION increment_message_count()
RETURNS VOID AS $$
BEGIN
  INSERT INTO messages (message_count)
  VALUES (1)
  ON CONFLICT DO NOTHING;
  
  UPDATE messages
  SET message_count = message_count + 1,
      updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Trigger for Row Level Security (RLS) - To be adapted according to your needs
ALTER TABLE thought_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE thought_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- RLS Policies (to be adapted according to your security needs)
CREATE POLICY "Allow public read on thought_views" ON thought_views
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on thought_reactions" ON thought_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on messages" ON messages
  FOR SELECT USING (true);

-- Write policies (to be adapted - may require authentication)
CREATE POLICY "Allow service role write on thought_views" ON thought_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role write on thought_reactions" ON thought_reactions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role write on messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');
