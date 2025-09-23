// Check if we are on the server or client
const isServer = typeof window === "undefined";

// Function HMAC compatible client/server
export async function createHmac(
  algorithm: string,
  key: string,
  data: string
): Promise<string> {
  if (isServer) {
    // Version server without node:crypto
    const { createHmac } = await import("node:crypto");
    return createHmac(algorithm, key).update(data).digest("hex");
  } else if (
    typeof window !== "undefined" &&
    window.crypto &&
    window.crypto.subtle
  ) {
    // Version browser with Web Crypto API
    const encoder = new TextEncoder();
    const keyData = encoder.encode(key);
    const dataBuffer = encoder.encode(data);

    const cryptoKey = await window.crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await window.crypto.subtle.sign(
      "HMAC",
      cryptoKey,
      dataBuffer
    );
    return Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
  } else {
    throw new Error("No crypto implementation available");
  }
}
