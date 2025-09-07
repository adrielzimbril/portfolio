import { logger, task } from "@trigger.dev/sdk";

export const testTask = task({
  id: "test-task",
  run: async () => {
    logger.info("test task");
  },
});
