# 🚀 Installation & Configuration

## 📋 Prérequis

- **Node.js**: version 18 ou supérieure
- **Gestionnaire de paquets**: pnpm (fortement recommandé) ou npm/yarn
- **Compte Supabase**: requis pour les fonctionnalités backend (communauté, quêtes, etc.)

## 🛠️ Instructions d'Installation

```bash
# Cloner le dépôt
git clone [url-du-repo]

# Aller dans le dossier du projet
cd shirofolio

# Installer les dépendances
pnpm install

# Copier le fichier d'exemple d'environnement
cp .env.example .env.local

# Lancer le serveur de développement
pnpm dev

# Pour le développement avec Trigger.dev (tâches planifiées)
pnpm run dev:all
```

## ⚙️ Variables d'Environnement

Copiez `.env.example` vers `.env.local` et remplissez les valeurs requises.

### Variables requises :
```env
# URL de l'application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Better Auth (Authentification)
BETTER_AUTH_SECRET=votre-secret-securise

# Supabase (Base de données & Auth)
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

### Variables optionnelles :
- **GitHub**: `NEXT_PRIVATE_GITHUB_TOKEN`, `NEXT_PUBLIC_GITHUB_USERNAME`
- **Email**: `BREVO_API_KEY`, `RESEND_API_KEY`
- **Stockage S3**: `S3_ACCESS_KEY_ID`, `S3_SECRET_ACCESS_KEY`
- **Analytics**: `NEXT_PUBLIC_GOOGLE_ANALYTICS_ID`
- **Trigger.dev**: `TRIGGER_ACCESS_TOKEN`, `NEXT_TRIGGER_PUBLIC_APP_URL`

## 🗄️ Commandes Supabase

Le projet inclut plusieurs scripts pour gérer le schéma de la base de données et les types.

```bash
# Pousser les migrations locales vers la base de données distante
pnpm db:push

# Générer les types TypeScript à partir du schéma de la base de données
pnpm db:types

# Réinitialiser la base de données locale (Docker requis)
pnpm db:reset

# Comparer les migrations locales avec l'état distant
pnpm db:diff
```
