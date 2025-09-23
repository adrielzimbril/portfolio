"use server"; // force le code à rester côté serveur

import { createHmac as nodeCreateHmac } from "crypto";

export async function createServerHmac(
  algorithm: string,
  key: string,
  data: string
): Promise<string> {
  return nodeCreateHmac(algorithm, key).update(data).digest("hex");
}
