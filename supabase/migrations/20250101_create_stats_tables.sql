-- Migration pour créer les tables nécessaires pour les statistiques
-- À exécuter manuellement dans Supabase SQL Editor

-- Table pour stocker les vues des articles
CREATE TABLE IF NOT EXISTS article_views (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  view_count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Table pour stocker les réactions aux articles
CREATE TABLE IF NOT EXISTS article_reactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT NOT NULL,
  reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'heart', 'celebrate', 'insightful')),
  count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(slug, reaction_type)
);

-- Table pour stocker les messages du community wall
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message_count INTEGER DEFAULT 0 NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index pour améliorer les performances
CREATE INDEX IF NOT EXISTS article_views_slug_idx ON article_views(slug);
CREATE INDEX IF NOT EXISTS article_reactions_slug_idx ON article_reactions(slug);
CREATE INDEX IF NOT EXISTS article_reactions_type_idx ON article_reactions(reaction_type);

-- Fonction pour incrémenter le compteur de vues
CREATE OR REPLACE FUNCTION increment_article_view(slug_param TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO article_views (slug, view_count)
  VALUES (slug_param, 1)
  ON CONFLICT (slug) DO UPDATE SET
    view_count = article_views.view_count + 1,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Fonction pour incrémenter le compteur de réactions
CREATE OR REPLACE FUNCTION increment_article_reaction(slug_param TEXT, reaction_type_param TEXT)
RETURNS VOID AS $$
BEGIN
  INSERT INTO article_reactions (slug, reaction_type, count)
  VALUES (slug_param, reaction_type_param, 1)
  ON CONFLICT (slug, reaction_type) DO UPDATE SET
    count = article_reactions.count + 1,
    updated_at = now();
END;
$$ LANGUAGE plpgsql;

-- Fonction pour incrémenter le compteur de messages
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

-- Trigger pour Row Level Security (RLS) - À adapter selon vos besoins
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Politiques RLS (à adapter selon vos besoins de sécurité)
CREATE POLICY "Allow public read on article_views" ON article_views
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on article_reactions" ON article_reactions
  FOR SELECT USING (true);

CREATE POLICY "Allow public read on messages" ON messages
  FOR SELECT USING (true);

-- Politiques d'écriture (à adapter - peut nécessiter authentification)
CREATE POLICY "Allow service role write on article_views" ON article_views
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role write on article_reactions" ON article_reactions
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "Allow service role write on messages" ON messages
  FOR ALL USING (auth.role() = 'service_role');
