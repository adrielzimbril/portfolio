import { logger } from "@/utils";
import {
  GetSignedUploadUrlHandler,
  GetSignedUrlHandler,
  UploadHandler,
} from "@/integrations/storage/types/types";
import { supabase } from "@/integrations/supabase/client";
import { fileToBuffer } from "@/integrations/storage/util";

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

export const uploadFile: UploadHandler = async (
  file,
  path,
  { bucket, contentType },
) => {
  try {
    const body = await fileToBuffer(file);

    const { data, error } = await supabase.storage
      .from(bucket)
      .upload(path, body, {
        contentType: contentType || "application/octet-stream",
        upsert: true,
      });

    if (error) throw error;

    // Get public URL
    const {
      data: { publicUrl },
    } = await supabase.storage.from(bucket).getPublicUrl(path);

    return { url: publicUrl, path };
  } catch (e) {
    logger.error("Supabase Storage: Could not upload file", e);
    throw new Error("Could not upload file");
  }
};
