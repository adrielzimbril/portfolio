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
