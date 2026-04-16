import { createClient } from "@supabase/supabase-js";
import logger from "@/utils";
import {
  GetSignedUploadUrlHandler,
  GetSignedUrlHandler,
} from "@/integrations/storage/types/types";
import { supabase } from "@/integrations/supabase/client";

export const getSignedUploadUrl: GetSignedUploadUrlHandler = async (
  path,
  { bucket },
) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUploadUrl(path);

    if (error) throw error;
    return data.signedUrl;
  } catch (e) {
    logger.error("Supabase Storage: Could not get signed upload url", e);
    throw new Error("Could not get signed upload url");
  }
};

export const getSignedUrl: GetSignedUrlHandler = async (
  path,
  { bucket, expiresIn = 3600 },
) => {
  try {
    const { data, error } = await supabase.storage
      .from(bucket)
      .createSignedUrl(path, expiresIn);

    if (error) throw error;
    return data.signedUrl;
  } catch (e) {
    logger.error("Supabase Storage: Could not get signed url", e);
    throw new Error("Could not get signed url");
  }
};
