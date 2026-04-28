# 🗄️ Database & Supabase

The project uses **Supabase** (PostgreSQL) as its primary database, integrated with an automated backup system and scheduled maintenance tasks.

## 🚀 Supabase Overview

- **Real-time Database**: Powered by PostgreSQL for storing all dynamic content (community messages, quest submissions, etc.).
- **Authentication**: Integrated with Supabase Auth (or Better Auth depending on configuration).
- **Edge Functions**: Used for specialized backend logic that needs to run close to the user.

## 🔄 Automated Backups

The project includes a robust, automated backup system that dumps the database and uploads it to S3-compatible storage.

### How it works:
1. **Trigger.dev Task**: A scheduled task (`sch-database-backup.ts`) runs daily at 02:00 UTC.
2. **API Request**: The task calls a protected API endpoint `/api/cron/backup-database`.
3. **Database Dump**: The server executes `pg_dump` on the database specified by `DATABASE_URL`.
4. **S3 Upload**: The resulting SQL dump is uploaded to the specified S3 bucket using the **Storage Integration**.

### Configuration for Backups:
To enable automated backups, you must configure the following environment variables:
- `DATABASE_URL`: Full PostgreSQL connection string.
- `S3_ACCESS_KEY_ID` & `S3_SECRET_ACCESS_KEY`: S3 credentials.
- `S3_ENDPOINT` & `S3_REGION`: S3 connection details.
- `S3_BACKUP_BUCKET`: The name of the bucket where backups will be stored (default: `database-backups`).
- `VERCEL_CRON_SECRET`: Secret key to authorize the backup request.

## ⏲️ Scheduled Tasks (Crons)

Managed through **Trigger.dev** and located in `src/integrations/tasks/trigger/schedules/`:

- **Database Backup** (`database-backup`): Runs daily SQL dumps to S3.
- **Health Check** (`supabase-live-check`): Periodically verifies that the Supabase instance is responsive.

## 🛠️ Local Management

You can manage your database schema and types using these commands:
- `pnpm db:push`: Push local migrations to Supabase.
- `pnpm db:types`: Regenerate TypeScript types based on your database schema.
- `pnpm db:reset`: Reset the local database (requires Docker).
- `pnpm db:diff`: Compare local migrations with the remote state.

---

> 💡 **Note**: The backup logic is located in `src/integrations/backup/`. It is designed to be provider-agnostic, with current support for PostgreSQL.
