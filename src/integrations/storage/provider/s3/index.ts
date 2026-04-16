import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3";
import { getSignedUrl as getS3SignedUrl } from "@aws-sdk/s3-request-presigner";
import { logger } from "@/utils";
import {
  GetSignedUploadUrlHandler,
  GetSignedUrlHandler,
} from "@/integrations/storage/types";
import { getS3Config } from "@/config";

let s3Client: S3Client | null = null;

const getS3Client = () => {
  if (s3Client) {
    return s3Client;
  }

  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config();

  if (!endpoint) {
    throw new Error("Missing env variable S3_ENDPOINT");
  }

  if (!accessKeyId) {
    throw new Error("Missing env variable S3_ACCESS_KEY_ID");
  }

  if (!secretAccessKey) {
    throw new Error("Missing env variable S3_SECRET_ACCESS_KEY");
  }

  s3Client = new S3Client({
    region: region || "auto",
    endpoint,
    forcePathStyle: true,
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  });

  return s3Client;
};

export const getSignedUploadUrl: GetSignedUploadUrlHandler = async (
  path,
  { bucket },
) => {
  const s3Client = getS3Client();
  try {
    return await getS3SignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: bucket,
        Key: path,
        ContentType: "image/jpeg",
      }),
      {
        expiresIn: 60,
      },
    );
  } catch (e) {
    logger.error(e);

    throw new Error("Could not get signed upload url");
  }
};

export const getSignedUrl: GetSignedUrlHandler = async (
  path,
  { bucket, expiresIn },
) => {
  const s3Client = getS3Client();
  try {
    return getS3SignedUrl(
      s3Client,
      new GetObjectCommand({ Bucket: bucket, Key: path }),
      { expiresIn },
    );
  } catch (e) {
    logger.error(e);
    throw new Error("Could not get signed url");
  }
};
