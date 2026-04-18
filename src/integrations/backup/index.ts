import { exec } from "child_process";
import { promisify } from "util";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { logger } from "@/utils";
import { ConfigValue, getS3Config } from "@/config";

const execAsync = promisify(exec);

/**
 * Backup Supabase database to S3
 * This function checks if both Supabase and S3 are configured before proceeding
 */
export async function backupSupabaseToS3(): Promise<{
  success: boolean;
  error?: string;
}> {
  // Check if Supabase is configured
  const supabaseUrl = ConfigValue.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = ConfigValue.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    logger.info("Supabase not configured, skipping backup");
    return { success: false, error: "Supabase not configured" };
  }

  // Check if S3 is configured
  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config();

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    logger.info("S3 not configured, skipping backup");
    return { success: false, error: "S3 not configured" };
  }

  try {
    // Extract project reference from Supabase URL
    // URL format: https://<project-ref>.supabase.co
    const urlMatch = supabaseUrl.match(/https:\/\/([^.]+)\.supabase\.co/);
    if (!urlMatch) {
      throw new Error("Invalid Supabase URL format");
    }
    const projectRef = urlMatch[1];

    // Get database connection string from environment
    // Supabase automatically provides DATABASE_URL via their integration
    // Priority: DATABASE_URL (auto) > POSTGRES_URL (auto) > SUPABASE_DB_URL (auto)
    const databaseUrl =
      ConfigValue.DATABASE_URL ||
      ConfigValue.POSTGRES_URL ||
      ConfigValue.SUPABASE_DB_URL;

    if (!databaseUrl) {
      throw new Error(
        "Database URL not found. Supabase should provide DATABASE_URL automatically via their Vercel integration.",
      );
    }

    // Use pg_dump to backup the database
    // This requires pg_dump to be installed in the environment
    // Generate timestamp for backup filename
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const backupFilename = `supabase-backup-${projectRef}-${timestamp}.sql`;
    const backupBucket = ConfigValue.S3_BACKUP_BUCKET || "database-backups";

    // Execute pg_dump
    logger.info(`Starting database backup for project ${projectRef}`);
    const { stdout: backupData } = await execAsync(
      `pg_dump "${databaseUrl}" --no-owner --no-acl --format=plain`,
    );

    // Initialize S3 client
    const s3Client = new S3Client({
      region: region || "auto",
      endpoint,
      forcePathStyle: true,
      credentials: {
        accessKeyId,
        secretAccessKey,
      },
    });

    // Upload backup to S3
    logger.info(`Uploading backup to S3 bucket: ${backupBucket}`);
    await s3Client.send(
      new PutObjectCommand({
        Bucket: backupBucket,
        Key: backupFilename,
        Body: backupData,
        ContentType: "application/sql",
      }),
    );

    logger.info(`Backup completed successfully: ${backupFilename}`);
    return { success: true };
  } catch (error) {
    logger.error("Backup failed:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
