import { apiRoutes } from "@/data/api-routes";
import logger from "@/utils/logger";
import { getPathUrl } from "./base-url";

const SECRET_KEY = process.env.API_SECRET_KEY || "default-secret-key";

// Check if we are on the server or client
const isServer = typeof window === "undefined";

// Convert to Base64URL
function toBase64Url(input: Buffer | string | object) {
  const inputFormatted =
    typeof input === "object" ? JSON.stringify(input) : input;

  if (isServer && Buffer) {
    return Buffer.from(inputFormatted)
      .toString("base64")
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  } else {
    // Version browser using btoa
    return btoa(inputFormatted as string)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
}

// Decode Base64URL back
function fromBase64Url(input: string) {
  input = input.replace(/-/g, "+").replace(/_/g, "/");
  while (input.length % 4) input += "=";

  if (isServer && Buffer) {
    const buffer = Buffer.from(input, "base64");
    return buffer.toString();
  } else {
    // Version browser using atob
    const decoded = atob(input);
    return decoded;
  }
}

// Function HMAC compatible client/server
export async function createHmac(
  algorithm: string,
  key: string,
  data: string
): Promise<string> {
  if (typeof window !== "undefined" && window.crypto && window.crypto.subtle) {
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
    try {
      const res = await fetch(getPathUrl("/api/sign"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ algorithm, key, data }),
      });

      if (!res.ok)
        throw new Error(
          `Server HMAC failed: ${res.status} \n\ With Data: ${data} | Algorithm: ${algorithm} | Key: ${key}`
        );

      const { signature } = await res.json();
      return signature;
    } catch (err) {
      logger.error("Unable to generate HMAC on server fallback", err);
      return "";
    }
  }
}

// ==========================================
// SOLUTION 1: Simple token with timestamp (ASYNC)
// ==========================================

/**
 * Generate a simple token with timestamp | Use on client/server
 *
 * @param input - The input to include in the token
 *
 * @returns A promise that resolves to the generated token
 */
export async function generateToken(input?: string | object): Promise<string> {
  const timestamp = Date.now();
  const inputStr = toBase64Url(input ?? "");
  const data = `health-check:${timestamp}:${inputStr}`;

  const hash = await createHmac("sha256", SECRET_KEY, data);

  // Format: timestamp:hash:input
  return input ? `${timestamp}:${hash}:${inputStr}` : `${timestamp}:${hash}`;
}

/**
 * Validate a simple token | Use on client/server
 *
 * @param token - The token to validate
 * @param maxAgeMinutes - The maximum age of the token in minutes
 *
 * @returns A promise that resolves to a boolean indicating whether the token is valid
 */
export async function validateToken(
  token: string,
  maxAgeMinutes: number = 5
): Promise<boolean> {
  try {
    const [timestampStr, receivedHash, input] = token.split(":");
    if (!timestampStr || !receivedHash) return false;

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000;

    // Check token age
    if (now - timestamp > maxAge) return false;

    // Recalculate hash
    const data = input
      ? `health-check:${timestamp}:${fromBase64Url(input)}`
      : `health-check:${timestamp}`;

    const expectedHash = await createHmac("sha256", SECRET_KEY, data);

    // Secure comparison (simple version for compatibility)
    return receivedHash === expectedHash;
  } catch {
    return false;
  }
}

// ==========================================
// SOLUTION 2: JWT ultra-simple (ASYNC)
// ==========================================

/**
 * Create a simple JWT without library | Use on client/server
 *
 * @param payload - The payload to include in the JWT
 * @param expiresInMinutes - The time in minutes after which the JWT expires
 *
 * @returns An object containing the JWT token, expiration time, and debug information
 *
 * @example
 * ```typescript
 * const { token, expiresAt, debug } = await generateJwtToken(payload);
 * ```
 */
export async function generateJwtToken(
  payload: any,
  expiresInMinutes: number = 5
): Promise<{ token: string; expiresAt: string; debug: any }> {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const exp = now + expiresInMinutes * 60;

  const jwtPayload = {
    ...payload,
    iat: now,
    exp: exp,
    iss: "trigger-task",
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(jwtPayload));

  // Create the signature with our HMAC compatible function
  const signatureData = `${encodedHeader}.${encodedPayload}`;
  const signatureHex = await createHmac("sha256", SECRET_KEY, signatureData);

  // Convert hex to base64url
  const signatureBuffer =
    isServer && Buffer
      ? Buffer.from(signatureHex, "hex")
      : new Uint8Array(
          signatureHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
        );

  const signature =
    isServer && Buffer
      ? signatureBuffer
          .toString("base64")
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "")
      : btoa(String.fromCharCode(...Array.from(signatureBuffer as Uint8Array)))
          .replace(/\+/g, "-")
          .replace(/\//g, "_")
          .replace(/=+$/, "");

  const token = `${encodedHeader}.${encodedPayload}.${signature}`;

  return {
    token,
    expiresAt: new Date(exp * 1000).toISOString(),
    debug: {
      issuedAt: new Date(now * 1000).toISOString(),
      lifetimeMinutes: expiresInMinutes,
      payload: jwtPayload,
    },
  };
}

/**
 * Validate a simple JWT | Use on client/server
 *
 * @param token - The JWT token to validate
 *
 * @returns An object containing the validation result and debug information
 *
 * @example
 * ```typescript
 * const { valid, payload, debug } = await validateJwtToken(token);
 * ```
 */
export async function validateJwtToken(token: string): Promise<{
  valid: boolean;
  payload?: any;
  debug: {
    reason?: string;
    tokenExpiry?: string;
    currentTime?: string;
    timeUntilExpiry?: number;
    signatureValid?: boolean;
  };
}> {
  const debug: any = {};

  try {
    // Check basic format
    const parts = token.split(".");
    if (parts.length !== 3) {
      return {
        valid: false,
        debug: {
          reason: "Invalid JWT format - expected 3 parts separated by dots",
        },
      };
    }

    const [encodedHeader, encodedPayload, receivedSignature] = parts;

    if (!encodedHeader || !encodedPayload) {
      return { valid: false, debug: { reason: "Invalid JWT format" } };
    }

    // Verify signature first
    const signatureData = `${encodedHeader}.${encodedPayload}`;
    const signatureHex = await createHmac("sha256", SECRET_KEY, signatureData);

    // Convert hex to base64url like in generateJwtToken
    const signatureBuffer =
      isServer && Buffer
        ? Buffer.from(signatureHex, "hex")
        : new Uint8Array(
            signatureHex.match(/.{2}/g)!.map((byte) => parseInt(byte, 16))
          );

    const expectedSignature =
      isServer && Buffer
        ? signatureBuffer
            .toString("base64")
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "")
        : btoa(
            String.fromCharCode(...Array.from(signatureBuffer as Uint8Array))
          )
            .replace(/\+/g, "-")
            .replace(/\//g, "_")
            .replace(/=+$/, "");

    debug.signatureValid = receivedSignature === expectedSignature;

    if (!debug.signatureValid) {
      return {
        valid: false,
        debug: {
          ...debug,
          reason: "Signature verification failed - check SECRET_KEY",
          expectedSignature: expectedSignature.slice(-10) + "...",
          receivedSignature: receivedSignature?.slice(-10) + "...",
        },
      };
    }

    // Decode payload
    const payloadStr = fromBase64Url(encodedPayload);
    const payload = JSON.parse(payloadStr);

    // Check expiration with detailed info
    const now = Math.floor(Date.now() / 1000);
    debug.currentTime = new Date(now * 1000).toISOString();
    debug.tokenExpiry = new Date(payload.exp * 1000).toISOString();
    debug.timeUntilExpiry = payload.exp - now;

    if (payload.exp && now > payload.exp) {
      return {
        valid: false,
        payload,
        debug: {
          ...debug,
          reason: `Token expired ${Math.abs(debug.timeUntilExpiry)} seconds ago`,
        },
      };
    }

    // All checks passed
    return {
      valid: true,
      payload,
      debug: {
        ...debug,
        reason: "Token is valid",
        timeUntilExpiry: debug.timeUntilExpiry,
      },
    };
  } catch (e: any) {
    return {
      valid: false,
      debug: {
        reason: `Exception during validation: ${e.message}`,
      },
    };
  }
}

// ==========================================
// SOLUTION 3: Version synchrone for the client only
// ==========================================

/**
 * Generates a simple token without cryptography (for the client only)
 * ATTENTION: Do not use in production for real security
 */
export function generateSimpleClientToken(payload: any): string {
  const timestamp = Date.now();
  const data = {
    ...payload,
    timestamp,
    exp: timestamp + 5 * 60 * 1000, // 5 minutes
  };

  return toBase64Url(JSON.stringify(data));
}

/**
 * Validates a simple token without cryptography (for the client only)
 * ATTENTION: Do not use in production for real security
 */
export function validateSimpleClientToken(token: string): {
  valid: boolean;
  payload?: any;
} {
  try {
    const decoded = fromBase64Url(token);
    const payload = JSON.parse(decoded);

    const now = Date.now();
    if (payload.exp && now > payload.exp) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// ==========================================
// SOLUTION 4: Static API key (unchanged)
// ==========================================

const API_KEYS = new Set([
  "api_key_trigger_task_2024",
  "health_check_key_prod",
  "B1npudHN2b2loeGJ1eGJ6Iiw",
]);

/**
 * Universal crypto.getRandomValues, works in Node 19+ and browsers
 *
 * @param size The number of bytes to generate
 *
 * @returns A Uint8Array of random bytes
 *
 * @example
 * ```typescript
 * const randomBytes = getRandomBytes(16); // Generate 16 random bytes Like : "B1npudHN2b2loeGJ1eGJ6Iiw"
 * ```
 */
function getRandomBytes(size: number): Uint8Array {
  if (typeof crypto !== "undefined" && crypto.getRandomValues) {
    const array = new Uint8Array(size);
    crypto.getRandomValues(array);
    return array;
  }
  // Fallback for older Node versions
  return new Uint8Array(size).map(() => Math.floor(Math.random() * 256));
}

/**
 * Generate a new API key
 *
 * @returns A new API key
 *
 * @example
 * ```typescript
 * const apiKey = generateApiKey(); // Generate a new API key
 * ```
 */
export function generateApiKey(): string {
  const prefix = "api_";
  const array = getRandomBytes(16);
  const randomPart = Array.from(array, (b) =>
    b.toString(16).padStart(2, "0")
  ).join("");
  return `${prefix}${randomPart}`;
}

/**
 * Validate a static API key
 *
 * @param apiKey The API key to validate
 *
 * @returns Whether the API key is valid
 *
 * @example
 * ```typescript
 * const isValid = validateApiKey("api_key_trigger_task_2024"); // Validate an API key
 * ```
 */
export function validateApiKey(apiKey: string): boolean {
  return API_KEYS.has(apiKey);
}
