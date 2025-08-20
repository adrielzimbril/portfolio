/*
  # Création des tables pour la newsletter

  1. Nouvelles Tables
    - `newsletter_subscribers`
      - `id` (uuid, clé primaire)
      - `nom` (text, nom complet de l'abonné)
      - `numero` (text, numéro de téléphone)
      - `email` (text, optionnel, adresse email)
      - `created_at` (timestamp, date d'inscription)
    
    - `newsletter_stats`
      - `id` (text, clé primaire pour identifier les stats)
      - `total_readers` (integer, nombre total de lecteurs)
      - `updated_at` (timestamp, dernière mise à jour)

  2. Sécurité
    - Activer RLS sur toutes les tables
    - Politiques pour permettre l'insertion publique (pour l'inscription)
    - Politiques pour la lecture des statistiques

  3. Données initiales
    - Initialiser le compteur de lecteurs à 90000
*/

-- Créer la table des abonnés à la newsletter
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nom text NOT NULL,
  numero text NOT NULL,
  email text,
  created_at timestamptz DEFAULT now()
);

-- Créer la table des statistiques
CREATE TABLE IF NOT EXISTS newsletter_stats (
  id text PRIMARY KEY,
  total_readers integer DEFAULT 0,
  updated_at timestamptz DEFAULT now()
);

-- Activer RLS sur les tables
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_stats ENABLE ROW LEVEL SECURITY;

-- Politiques pour newsletter_subscribers
-- Permettre l'insertion publique (pour les inscriptions)
CREATE POLICY "Allow public insert on newsletter_subscribers"
  ON newsletter_subscribers
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Permettre la lecture pour les utilisateurs authentifiés (admin)
CREATE POLICY "Allow authenticated read on newsletter_subscribers"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

-- Politiques pour newsletter_stats
-- Permettre la lecture publique des statistiques
CREATE POLICY "Allow public read on newsletter_stats"
  ON newsletter_stats
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Permettre la mise à jour publique des statistiques (pour l'incrémentation)
CREATE POLICY "Allow public update on newsletter_stats"
  ON newsletter_stats
  FOR UPDATE
  TO anon, authenticated
  USING (true);

-- Permettre l'insertion publique des statistiques
CREATE POLICY "Allow public insert on newsletter_stats"
  ON newsletter_stats
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Initialiser les statistiques avec 90000 lecteurs
INSERT INTO newsletter_stats (id, total_readers, updated_at)
VALUES ('main', 90000, now())
ON CONFLICT (id) DO NOTHING;