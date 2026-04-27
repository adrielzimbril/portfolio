/**
 * Convert various file types to Buffer for upload
 */
export async function fileToBuffer(
  file: File | Buffer | string,
): Promise<Buffer> {
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }
  if (file instanceof Buffer) {
    return file;
  }
  return Buffer.from(file);
}

/**
 * Convert Buffer to Uint8Array for AWS SDK
 */
export function bufferToUint8Array(buffer: Buffer): Uint8Array {
  return new Uint8Array(buffer);
}

/**
 * Convert various file types to Uint8Array for AWS SDK
 */
export async function fileToUint8Array(
  file: File | Buffer | string,
): Promise<Uint8Array> {
  if (file instanceof File) {
    const arrayBuffer = await file.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  }
  if (file instanceof Buffer) {
    return new Uint8Array(file);
  }
  return new Uint8Array(Buffer.from(file));
}
