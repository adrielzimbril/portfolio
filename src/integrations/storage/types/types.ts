export type CreateBucketHandler = (
  name: string,
  options?: {
    public?: boolean;
  },
) => Promise<void>;

export type GetSignedUploadUrlHandler = (
  path: string,
  options: {
    bucket: string;
  },
) => Promise<string>;

export type GetSignedUrlHandler = (
  path: string,
  options: {
    bucket: string;
    expiresIn?: number;
  },
) => Promise<string>;

export type UploadHandler = (
  file: File | Buffer | string,
  path: string,
  options: {
    bucket: string;
    contentType?: string;
  },
) => Promise<{ url: string; path: string }>;
