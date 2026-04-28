# 🗄️ Base de Données & Supabase

Le projet utilise **Supabase** (PostgreSQL) comme base de données principale, intégrée à un système de sauvegarde automatisé et à des tâches de maintenance planifiées.

## 🚀 Présentation de Supabase

- **Base de données en temps réel** : Propulsée par PostgreSQL pour stocker tout le contenu dynamique (messages de la communauté, soumissions de quêtes, etc.).
- **Authentification** : Intégrée à Supabase Auth (ou Better Auth selon la configuration).
- **Edge Functions** : Utilisées pour la logique backend spécialisée qui doit s'exécuter au plus près de l'utilisateur.

## 🔄 Sauvegardes Automatisées

Le projet inclut un système de sauvegarde robuste et automatisé qui effectue un dump de la base de données et le télécharge vers un stockage compatible S3.

### Fonctionnement :
1. **Tâche Trigger.dev** : Une tâche planifiée (`sch-database-backup.ts`) s'exécute quotidiennement à 02:00 UTC.
2. **Requête API** : La tâche appelle un endpoint API protégé `/api/cron/backup-database`.
3. **Dump de la base** : Le serveur exécute `pg_dump` sur la base de données spécifiée par `DATABASE_URL`.
4. **Téléchargement S3** : Le dump SQL résultant est téléchargé vers le bucket S3 spécifié via l'**Intégration de Stockage**.

### Configuration des sauvegardes :
Pour activer les sauvegardes automatisées, vous devez configurer les variables d'environnement suivantes :
- `DATABASE_URL` : Chaîne de connexion PostgreSQL complète.
- `S3_ACCESS_KEY_ID` & `S3_SECRET_ACCESS_KEY` : Identifiants S3.
- `S3_ENDPOINT` & `S3_REGION` : Détails de connexion S3.
- `S3_BACKUP_BUCKET` : Le nom du bucket où les sauvegardes seront stockées (par défaut : `database-backups`).
- `VERCEL_CRON_SECRET` : Clé secrète pour autoriser la requête de sauvegarde.

## ⏲️ Tâches Planifiées (Crons)

Gérées via **Trigger.dev** et situées dans `src/integrations/tasks/trigger/schedules/` :

- **Sauvegarde de la base** (`database-backup`) : Effectue des dumps SQL quotidiens vers S3.
- **Vérification de santé** (`supabase-live-check`) : Vérifie périodiquement que l'instance Supabase est réactive.

## 🛠️ Gestion Locale

Vous pouvez gérer votre schéma de base de données et vos types à l'aide de ces commandes :
- `pnpm db:push` : Pousser les migrations locales vers Supabase.
- `pnpm db:types` : Régénérer les types TypeScript basés sur le schéma de votre base de données.
- `pnpm db:reset` : Réinitialiser la base de données locale (nécessite Docker).
- `pnpm db:diff` : Comparer les migrations locales avec l'état distant.

---

> 💡 **Note** : La logique de sauvegarde se trouve dans `src/integrations/backup/`. Elle est conçue pour être indépendante du fournisseur, avec un support actuel pour PostgreSQL.
