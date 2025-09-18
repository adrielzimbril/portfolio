import { z } from "zod";
import { ConfigValue } from "@config/index";

const environmentVariablesSchema = z.object({
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  NEXT_PUBLIC_REST_API_ENDPOINT: z
    .string()
    .min(1, "[⚠️ ENV_VAR_WARNING] NEXT_PUBLIC_REST_API_ENDPOINT is required"),
  NEXT_PUBLIC_WEBSITE_URL: z
    .string()
    .min(1, "[⚠️ ENV_VAR_WARNING] NEXT_PUBLIC_WEBSITE_URL is required"),
});

export type EnvVars = z.infer<typeof environmentVariablesSchema>;

export function validateEnvironmentVariables() {
  const result = environmentVariablesSchema.safeParse(
    Object.fromEntries(
      Object.keys(ConfigValue).map((key) => [
        key,
        ConfigValue[key as keyof typeof ConfigValue],
      ])
    )
  );

  if (!result.success) {
    // Convert ZodError to array of error messages
    const errors = result.error.issues.map((e) => e.message);
    throw new Error(
      `[❌ ENV_VAR_WARNING] Please set the following environment variables: ${errors.join(", ")}`
    );
  }

  return result.data; // ✅ returns the validated and typed environment variables
}
