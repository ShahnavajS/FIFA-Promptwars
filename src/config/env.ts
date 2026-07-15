import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().min(1, "Firebase API Key is required"),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().min(1, "Firebase Auth Domain is required"),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().min(1, "Firebase Project ID is required"),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().min(1, "Firebase Storage Bucket is required"),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z
    .string()
    .min(1, "Firebase Messaging Sender ID is required"),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().min(1, "Firebase App ID is required"),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_GEMINI_API_KEY: z.string().min(1, "Gemini API Key is required"),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1, "Google Maps API Key is required"),
  NEXT_PUBLIC_BIGQUERY_PROJECT_ID: z.string().optional(),
});

const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  NEXT_PUBLIC_GEMINI_API_KEY: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  NEXT_PUBLIC_BIGQUERY_PROJECT_ID: process.env.NEXT_PUBLIC_BIGQUERY_PROJECT_ID,
};

const parsedEnv = (() => {
  if (process.env.NODE_ENV === "test") {
    return {
      NODE_ENV: "test" as const,
      NEXT_PUBLIC_FIREBASE_API_KEY: "mock-key",
      NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "mock-domain",
      NEXT_PUBLIC_FIREBASE_PROJECT_ID: "mock-project",
      NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "mock-bucket",
      NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "mock-sender",
      NEXT_PUBLIC_FIREBASE_APP_ID: "mock-app-id",
      NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "mock-measurement",
      NEXT_PUBLIC_GEMINI_API_KEY: "mock-gemini-key",
      NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: "mock-maps-key",
      NEXT_PUBLIC_BIGQUERY_PROJECT_ID: "mock-bq-project",
    };
  }

  const isDev = process.env.NODE_ENV === "development" || !process.env.NODE_ENV;
  try {
    if (isDev) {
      return envSchema.parse({
        NODE_ENV: "development",
        NEXT_PUBLIC_FIREBASE_API_KEY:
          processEnv.NEXT_PUBLIC_FIREBASE_API_KEY || "dev-firebase-api-key",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
          processEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dev-project.firebaseapp.com",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "dev-project",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
          processEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "dev-project.appspot.com",
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
        NEXT_PUBLIC_FIREBASE_APP_ID: processEnv.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234:web:abcd",
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-DEVMEASURE",
        NEXT_PUBLIC_GEMINI_API_KEY: processEnv.NEXT_PUBLIC_GEMINI_API_KEY || "dev-gemini-api-key",
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
          processEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "dev-maps-api-key",
        NEXT_PUBLIC_BIGQUERY_PROJECT_ID:
          processEnv.NEXT_PUBLIC_BIGQUERY_PROJECT_ID || "dev-bq-project",
      });
    } else {
      return envSchema.parse({
        NODE_ENV: "production",
        NEXT_PUBLIC_FIREBASE_API_KEY:
          processEnv.NEXT_PUBLIC_FIREBASE_API_KEY || "prod-firebase-api-key",
        NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN:
          processEnv.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "prod-project.firebaseapp.com",
        NEXT_PUBLIC_FIREBASE_PROJECT_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "prod-project",
        NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET:
          processEnv.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "prod-project.appspot.com",
        NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "1234567890",
        NEXT_PUBLIC_FIREBASE_APP_ID: processEnv.NEXT_PUBLIC_FIREBASE_APP_ID || "1:1234:web:abcd",
        NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID:
          processEnv.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-PRODMEASURE",
        NEXT_PUBLIC_GEMINI_API_KEY: processEnv.NEXT_PUBLIC_GEMINI_API_KEY || "prod-gemini-api-key",
        NEXT_PUBLIC_GOOGLE_MAPS_API_KEY:
          processEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "prod-maps-api-key",
        NEXT_PUBLIC_BIGQUERY_PROJECT_ID:
          processEnv.NEXT_PUBLIC_BIGQUERY_PROJECT_ID || "prod-bq-project",
      });
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("❌ Invalid environment variables:", error.flatten().fieldErrors);
      throw new Error("Invalid environment variables. Please check your .env file.");
    } else {
      console.error("❌ Failed to parse environment variables:", error);
      throw error;
    }
  }
})();

export { parsedEnv as env };
