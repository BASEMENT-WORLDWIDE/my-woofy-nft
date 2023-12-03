import "dotenv/config";
import type { Config } from "drizzle-kit";
import { env } from "./env.mjs";

export default {
  schema: "./db/schema.ts",
  out: "./drizzle",
  driver: "turso",
  verbose: true,
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN,
  },
} satisfies Config;
