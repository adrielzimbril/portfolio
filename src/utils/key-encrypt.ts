import crypto from "node:crypto";

const SECRET_KEY =
  process.env.HEALTH_CHECK_SECRET_KEY ||
  process.env.API_SECRET_KEY ||
  "your-secret-key";

// ==========================================
// SOLUTION 1: Simple token with timestamp
// ==========================================

/**
 * Generate a simple token with timestamp
 */
export function generateToken(): string {
  const timestamp = Date.now();
  const data = `health-check:${timestamp}`;
  const hash = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(data)
    .digest("hex");

  // Format: timestamp:hash
  return `${timestamp}:${hash}`;
}

/**
 * Validate a simple token
 */
export function validateToken(
  token: string,
  maxAgeMinutes: number = 5
): boolean {
  try {
    const [timestampStr, receivedHash] = token.split(":");
    if (!timestampStr || !receivedHash) return false;

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000;

    // Check token age
    if (now - timestamp > maxAge) return false;

    // Recalculate hash
    const data = `health-check:${timestamp}`;
    const expectedHash = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(data)
      .digest("hex");

    // Secure comparison
    return crypto.timingSafeEqual(
      Buffer.from(receivedHash),
      Buffer.from(expectedHash)
    );
  } catch {
    return false;
  }
}

// ==========================================
// SOLUTION 2: JWT ultra-simple (without library)
// ==========================================

/**
 * Create a simple JWT without library
 */
export function createSimpleJWT(
  payload: any,
  expiresInMinutes: number = 5
): string {
  const header = {
    alg: "HS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const jwtPayload = {
    ...payload,
    iat: now, // issued at
    exp: now + expiresInMinutes * 60, // expires
    iss: "trigger-task", // issuer
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString(
    "base64url"
  );
  const encodedPayload = Buffer.from(JSON.stringify(jwtPayload)).toString(
    "base64url"
  );

  const signature = crypto
    .createHmac("sha256", SECRET_KEY)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64url");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Validate a simple JWT
 */
export function validateSimpleJWT(token: string): {
  valid: boolean;
  payload?: any;
} {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return { valid: false };

    const [encodedHeader, encodedPayload, receivedSignature] = parts as [
      string,
      string,
      string,
    ];

    // Validate signature
    const expectedSignature = crypto
      .createHmac("sha256", SECRET_KEY)
      .update(`${encodedHeader}.${encodedPayload}`)
      .digest("base64url");

    if (
      !crypto.timingSafeEqual(
        Buffer.from(receivedSignature),
        Buffer.from(expectedSignature)
      )
    ) {
      return { valid: false };
    }

    // Decode payload
    const payload = JSON.parse(
      Buffer.from(encodedPayload, "base64url").toString()
    );

    // Verify expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && now > payload.exp) {
      return { valid: false };
    }

    return { valid: true, payload };
  } catch {
    return { valid: false };
  }
}

// ==========================================
// SOLUTION 3: Hash simple with nonce
// ==========================================

/**
 * Generate a hash with nonce
 */
export function generateHashToken(): string {
  const nonce = crypto.randomBytes(16).toString("hex");
  const timestamp = Date.now();
  const data = `${nonce}:${timestamp}:health-check`;
  const hash = crypto
    .createHash("sha256")
    .update(data + SECRET_KEY)
    .digest("hex");

  return `${nonce}:${timestamp}:${hash}`;
}

/**
 * Validate a hash with nonce
 */
export function validateHashToken(
  token: string,
  maxAgeMinutes: number = 5
): boolean {
  try {
    const [nonce, timestampStr, receivedHash] = token.split(":");
    if (!nonce || !timestampStr || !receivedHash) return false;

    const timestamp = parseInt(timestampStr);
    const now = Date.now();
    const maxAge = maxAgeMinutes * 60 * 1000;

    // Check token age
    if (now - timestamp > maxAge) return false;

    // Recalculate hash
    const data = `${nonce}:${timestamp}:health-check`;
    const expectedHash = crypto
      .createHash("sha256")
      .update(data + SECRET_KEY)
      .digest("hex");

    return crypto.timingSafeEqual(
      Buffer.from(receivedHash),
      Buffer.from(expectedHash)
    );
  } catch {
    return false;
  }
}

// ==========================================
// SOLUTION 4: Static API key (the simplest)
// ==========================================

const API_KEYS = new Set([
  "api_key_trigger_task_2024",
  "health_check_key_prod",
  "B1npudHN2b2loeGJ1eGJ6Iiw",
]);

/**
 * Generate a new API key
 */
export function generateApiKey(): string {
  const prefix = "api_";
  const randomPart = crypto.randomBytes(16).toString("hex");
  return `${prefix}${randomPart}`;
}

/**
 * Validate a static API key
 */
export function validateApiKey(apiKey: string): boolean {
  return API_KEYS.has(apiKey);
}

// ==========================================
// EXAMPLES OF USAGE
// ==========================================

export function demonstrateUsage() {
  console.log("=== Solutions simples de validation ===\n");

  // Solution 1: Token with timestamp
  console.log("1. Token simple:");
  const simpleToken = generateToken();
  console.log("Token generated:", simpleToken);
  console.log("Valid:", validateToken(simpleToken));
  console.log();

  // Solution 2: JWT simple
  console.log("2. JWT simple:");
  const jwt = createSimpleJWT({ action: "health-check" });
  console.log("JWT generated:", jwt.substring(0, 50) + "...");
  const jwtResult = validateSimpleJWT(jwt);
  console.log("Valid:", jwtResult.valid);
  console.log("Payload:", jwtResult.payload);
  console.log();

  // Solution 3: Hash with nonce
  console.log("3. Hash with nonce:");
  const hashToken = generateHashToken();
  console.log("Token generated:", hashToken);
  console.log("Valid:", validateHashToken(hashToken));
  console.log();

  // Solution 4: Static API key
  console.log("4. Static API key:");
  const apiKey = "api_key_trigger_task_2024";
  console.log("Key:", apiKey);
  console.log("Valid:", validateApiKey(apiKey));
}

// Uncomment to test
// demonstrateUsage();
