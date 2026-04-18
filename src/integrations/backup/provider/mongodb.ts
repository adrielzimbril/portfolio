import { exec } from "child_process";
import { promisify } from "util";
import { logger } from "@/utils";
import { ConfigValue, getS3Config } from "@/config";
import { uploadToS3, generateBackupTimestamp } from "../util";

const execAsync = promisify(exec);

/**
 * Backup MongoDB database to S3
 * Uses mongodump to create a BSON dump and uploads it to S3
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
    const backupFilename = `mongodb-backup-${timestamp}.archive`;
    const backupBucket = ConfigValue.S3_BACKUP_BUCKET || "database-backups";

    // Execute mongodump
    logger.info("Starting MongoDB database backup");
    const { stdout: backupData } = await execAsync(
      `mongodump --uri="${databaseUrl}" --archive`
    );

    // Upload backup to S3
    logger.info(`Uploading backup to S3 bucket: ${backupBucket}`);
    await uploadToS3(backupData, backupFilename, backupBucket);

    logger.info(`Backup completed successfully: ${backupFilename}`);
    return { success: true };
  } catch (error) {
    logger.error("MongoDB backup failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
