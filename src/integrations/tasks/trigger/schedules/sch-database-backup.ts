import { logger, schedules } from "@trigger.dev/sdk";
import { ConfigValue } from "@/config";
import { backupDatabase } from "@/integrations/backup";

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
    try {
      logger.info("Starting database backup task");

      const result = await backupDatabase();

      if (result.success) {
        logger.info("Database backup completed successfully");
        return { status: "success" };
      } else {
        logger.error("Database backup failed", { error: result.error });
        throw new Error(result.error || "Backup failed");
      }
    } catch (error) {
      logger.error("Database backup task execution failed", { error });
      throw error;
    }
  },
});
