import { z } from "zod";

export const globalSearchSchema = z.object({
  query: z.string(),
});

export type GlobalSearchSchema = z.infer<typeof globalSearchSchema>;
