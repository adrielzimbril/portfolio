# 🚀 Installation & Configuration

## 📋 Prérequis

- **Node.js**: version 18 ou supérieure
- **Gestionnaire de paquets**: pnpm (fortement recommandé) ou npm/yarn
- **Compte Supabase**: requis pour les fonctionnalités backend (communauté, quêtes, etc.)
- **Compte Trigger.dev**: optionnel, pour les tâches en arrière-plan

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

Le projet utilise un système de validation strict pour les variables d'environnement. Au démarrage, l'application vérifie les variables requises et consigne des avertissements ou des erreurs si certaines sont manquantes ou invalides.

### Variables requises (Démarrage rapide) :
Copiez `.env.example` vers `.env.local` et remplissez au moins ces valeurs pour commencer :

```env
# URL de l'application
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Fournisseur d'authentification (Options: "supabase" ou "betterauth")
AUTH_PROVIDER="supabase"

# Supabase (Base de données & Auth)
NEXT_PUBLIC_SUPABASE_URL=votre-url-supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=votre-cle-anon-supabase
```

### Validation de l'Environnement
La logique de validation se trouve dans **`src/config/validate-environment-variables.ts`**. Elle utilise **Zod** pour garantir :
- **Sécurité de type** : Les variables sont validées par rapport à un schéma (URLs, chaînes, enums).
- **Valeurs par défaut** : De nombreuses variables ont des valeurs par défaut raisonnables (ex: `PORT: 3000`, `NODE_ENV: production`).
- **Logs** : En développement, le `logger` vous informera de toutes les variables optionnelles manquantes.

> 💡 **Conseil** : Reportez-vous aux nombreux commentaires dans **`.env.example`** pour une liste complète de toutes les variables disponibles et comment obtenir leurs valeurs.

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
