// tasks/supabase-live-check.ts
import { logger, task } from "@trigger.dev/sdk";
import { getApiBaseUrl } from "@/utils";

const API_BASE_URL = getApiBaseUrl();

export const supabaseLiveCheckTask = task({
  id: "supabase-live-check",
  description:
    "This is a scheduled task for checking supabase project database status",
  queue: {
    name: "supabase-live-check-queue",
    concurrencyLimit: 1,
  },
  run: async (payload) => {
    try {
      logger.info(
        `Starting Supabase health check via API... with payload : ${payload}`,
        { status: "starting", data: payload }
      );

      const response = await fetch(`${API_BASE_URL}/supabase-health-check`, {
        method: "POST",
      });

      if (!response.ok) {
        logger.error(`API responded with status: ${response.status}`, {
          status: "error",
          data: { status: response.status },
        });
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();

      if (!result.success) {
        logger.error(`Health check failed: ${result.error}`, {
          status: "error",
          data: result,
        });
        throw new Error(`Health check failed: ${result.error}`);
      }

      logger.info(`Health check successful: ${result}`, {
        status: "success",
        data: result,
      });
      return result;
    } catch (error) {
      logger.error(`Supabase health check failed: ${error}`, {
        status: "error",
        data: { error },
      });
      throw error;
    }
  },
});
