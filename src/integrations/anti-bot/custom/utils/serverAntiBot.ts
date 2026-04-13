export interface ServerBotValidationOptions {
  minTime?: number;
  maxTime?: number;
  checkIpRate?: boolean;
}

// Simple cache for rate limiting (in production, use Redis)
const ipAttempts = new Map<string, number[]>();

export const validateServerBotProtection = (
  data: any,
  clientIp?: string,
  options: ServerBotValidationOptions = {}
) => {
  const {
    minTime = 2000, // More strict on the server side
    maxTime = 30 * 60 * 1000,
    checkIpRate = true,
  } = options;

  // 1. Verify honeypot
  if (data.website && data.website.trim() !== "") {
    throw new Error("Bot detected");
  }

  // 2. Verify timing
  if (!data._timestamp) {
    throw new Error("Timestamp missing");
  }

  const currentTime = Date.now();
  const formTime = parseInt(data._timestamp);
  const timeDiff = currentTime - formTime;

  if (timeDiff < minTime || timeDiff > maxTime) {
    throw new Error("Timing invalid");
  }

  // 3. Verify token
  if (!data._token || data._token.length < 10) {
    throw new Error("Token invalid");
  }

  // 4. Rate limiting basic per IP
  if (checkIpRate && clientIp) {
    const now = Date.now();
    const attempts = ipAttempts.get(clientIp) || [];

    // Clean old attempts (more than 1 hour)
    const recentAttempts = attempts.filter(
      (time) => now - time < 60 * 60 * 1000
    );

    // Max 10 submissions per hour per IP
    if (recentAttempts.length >= 10) {
      throw new Error("Too many attempts");
    }

    recentAttempts.push(now);
    ipAttempts.set(clientIp, recentAttempts);
  }

  return true;
};
