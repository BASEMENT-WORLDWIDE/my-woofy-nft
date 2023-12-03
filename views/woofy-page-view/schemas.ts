import { z } from "zod";

export const woofyFormSchema = z.object({
  name: z.string().min(2),
  backstory: z.string().max(1024).optional(),
});

export type WoofyFormSchema = z.infer<typeof woofyFormSchema>;
