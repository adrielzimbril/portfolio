"use server";

import { createHmac } from "crypto";

export async function createServerHmac(
  algorithm: string,
  key: string,
  data: string
): Promise<string> {
  const { createHmac } = await import("crypto");
  return createHmac(algorithm, key).update(data).digest("hex");
}
