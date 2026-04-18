import { exec } from "child_process";
import { promisify } from "util";
import { logger } from "@/utils";
import { ConfigValue, getS3Config } from "@/config";
import { uploadFile } from "@/integrations/storage";
import { generateBackupTimestamp } from "@/integrations/backup/util";

const execAsync = promisify(exec);

/**
 * Backup MySQL database to S3
 * Uses mysqldump to create a SQL dump and uploads it to S3
 */
export async function backupDatabase(): Promise<{
  success: boolean;
  error?: string;
}> {
  const databaseUrl = ConfigValue.DATABASE_URL;

  if (!databaseUrl) {
    logger.info("DATABASE_URL not configured, skipping backup");
    return { success: false, error: "DATABASE_URL not configured" };
  }

  // Check if S3 is configured
  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config();

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    logger.info("S3 not configured, skipping backup");
    return { success: false, error: "S3 not configured" };
  }

  try {
    // Generate timestamp for backup filename
    const timestamp = generateBackupTimestamp();
    const backupFilename = `mysql-backup-${timestamp}.sql`;
    const backupBucket = ConfigValue.S3_BACKUP_BUCKET || "database-backups";

    // Execute mysqldump
    logger.info("Starting MySQL database backup");
    const { stdout: backupData } = await execAsync(
      `mysqldump "${databaseUrl}"`,
    );

    // Upload backup to S3 using storage integration
    logger.info(`Uploading backup to S3 bucket: ${backupBucket}`);
    await uploadFile(backupData, backupFilename, {
      bucket: backupBucket,
      contentType: "application/sql",
    });

    logger.info(`Backup completed successfully: ${backupFilename}`);
    return { success: true };
  } catch (error) {
    logger.error("MySQL backup failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
