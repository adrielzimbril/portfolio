import { logger, schedules } from "@trigger.dev/sdk";
import { apiRoutes } from "@/data/api-routes";
import { ConfigValue } from "@/config";

export const supabaseLiveCheckTask = schedules.task({
  //unique id for the schedule
  id: "supabase-live-check",
  //description for the schedule
  description:
    "This is a scheduled task for checking supabase project database status",
  //every weeks (UTC timezone)
  cron: {
    pattern: "0 0 * * 0",
    timezone: "UTC",
  },
  //queue the task to run with a max concurrency limit of 1
  queue: {
    name: "supabase-live-check-queue",
    concurrencyLimit: 1,
  },
  //run the task
  run: async () => {
    const url = `${process.env.NEXT_TRIGGER_PUBLIC_APP_URL}/api/views`;

    try {
      logger.info("Starting Supabase health check via API...");

      logger.info("Fetching health check API", { url });

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ isBot: true }),
      });

      const result = await response.json();

      logger.info("Health check API response", { result });

      logger.info("Health check successful:", {
        status: "success",
        dataCount: result.dataCount,
        timestamp: result.timestamp,
      });

      return result;
    } catch (error) {
      logger.error("Fetching health check API", { url, error });

      logger.error(`Task execution failed`, {
        status: "error",
        error: error,
      });
      throw error;
    }
  },
});
