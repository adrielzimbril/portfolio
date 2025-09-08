import { logger, task, schedules } from "@trigger.dev/sdk";
import { getApiBaseUrl, generateToken } from "@/utils";

const API_BASE_URL = getApiBaseUrl();

export const supabaseLiveCheckTask = schedules.task({
  //unique id for the schedule
  id: "supabase-live-check",
  //description for the schedule
  description:
    "This is a scheduled task for checking supabase project database status",
  //every 3 months (UTC timezone)
  cron: {
    pattern: "0 0 * * 1",
    timezone: "UTC",
  },
  //queue the task to run with a max concurrency limit of 1
  queue: {
    name: "supabase-live-check-queue",
    concurrencyLimit: 1,
  },
  //run the task
  run: async (payload) => {
    try {
      logger.info("Starting Supabase health check via API...");

      // Validation token generation
      const token = generateToken();

      const response = await fetch(`${API_BASE_URL}/health/check-rmd`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `API responded with status: ${response.status} - ${errorText}`
        );
      }

      const result = await response.json();

      if (!result.success) {
        logger.error(`Health check failed`, {
          status: "error",
          error: result.error,
        });
        throw new Error(`Health check failed: ${result.error}`);
      }

      logger.info("Health check successful:", {
        status: "success",
        dataCount: result.dataCount,
        timestamp: result.timestamp,
      });

      return result;
    } catch (error) {
      logger.error(`Task execution failed`, { status: "error", error: error });
      throw error;
    }
  },
});
