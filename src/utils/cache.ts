"use server";

import { revalidatePath } from "next/cache";
import { logger } from "@/utils";

export const clearCache = async (path?: string) => {
  try {
    if (path) {
      revalidatePath(path);
    } else {
      revalidatePath("/", "layout");
    }
  } catch (error) {
    logger.error("Could not revalidate path", path, error);
  }
};
