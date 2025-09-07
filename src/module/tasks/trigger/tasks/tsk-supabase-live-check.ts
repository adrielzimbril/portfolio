import { logger, task } from "@trigger.dev/sdk";
import { createClient } from "@supabase/supabase-js";
import { supabaseKey } from "@/module/supabase/client";

export const supabaseLiveCheckTask = task({
  //unique id for the task
  id: "supabase-live-check",
  //description for the task
  description:
    "This is a scheduled task for checking supabase project database status",
  //queue the task to limit concurrency to 1 max
  queue: {
    name: "supabase-live-check-queue",
    concurrencyLimit: 1,
  },
  run: async (payload) => {
    const supabase = createClient(supabaseKey.url, supabaseKey.anonKey);
    const { data, error } = await supabase.functions.invoke(
      "check_tables_rls",
      {
        body: { name: "Functions" },
      }
    );

    // Log the received data
    logger.info(data); //is an array of Date objects

    if (error) {
      logger.error(error);
    }
  },
});
