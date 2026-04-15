import { createClient } from "@supabase/supabase-js";
import logger from "@/utils/logger";
import {
  GetSignedUploadUrlHandler,
  GetSignedUrlHander,
} from "@/integrations/storage/types/types";

// Using environment variables directly for a clean server-side storage client
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PRIVATE_SUPABASE_ANON_KEY || "";

const getSupabaseClient = () => {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Missing Supabase environment variables (URL or Service Role Key)");
  }
  return createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
};

export const getSignedUploadUrl: GetSignedUploadUrlHandler = async (
  path,
  { bucket }
) => {
  const supabase = getSupabaseClient();
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

export const getSignedUrl: GetSignedUrlHander = async (
  path,
  { bucket, expiresIn = 3600 }
) => {
  const supabase = getSupabaseClient();
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
