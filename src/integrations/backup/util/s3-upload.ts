import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { logger } from "@/utils";
import { getS3Config } from "@/config";

let s3Client: S3Client | null = null;

const getS3Client = () => {
  if (s3Client) {
    return s3Client;
  }

  const { endpoint, region, accessKeyId, secretAccessKey } = getS3Config();

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error("S3 not configured");
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

export async function uploadToS3(
  data: string,
  filename: string,
  bucket: string,
): Promise<void> {
  const s3Client = getS3Client();

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: filename,
      Body: data,
      ContentType: "application/sql",
    }),
  );
}
