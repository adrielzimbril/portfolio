import { logger, schedules } from "@trigger.dev/sdk";

export const databaseBackupTask = schedules.task({
  id: "database-backup",
  description: "Daily database backup to S3",
  cron: {
    pattern: "0 2 * * *",
    timezone: "UTC",
  },
  queue: {
    name: "database-backup-queue",
    concurrencyLimit: 1,
  },
  run: async () => {
    const url = `${process.env.NEXT_TRIGGER_PUBLIC_APP_URL}/api/cron/backup-database`;
    const cronSecret = process.env.VERCEL_CRON_SECRET;

    if (!cronSecret) {
      logger.error("VERCEL_CRON_SECRET not configured");
      throw new Error("VERCEL_CRON_SECRET not configured");
    }

    try {
      logger.info("Starting database backup via API...");

      logger.info("Fetching backup API", { url });

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${cronSecret}`,
        },
      });

      const result = await response.json();

      logger.info("Backup API response", { result });

      if (result.success) {
        logger.info("Database backup completed successfully");
        return result;
      } else {
        logger.error("Database backup failed", { error: result.error });
        throw new Error(result.error || "Backup failed");
      }
    } catch (error) {
      logger.error("Fetching backup API", { url, error });

      logger.error("Task execution failed", {
        status: "error",
        error,
      });
      throw error;
    }
  },
});
