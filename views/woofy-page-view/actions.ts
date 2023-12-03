"use server";

import { db } from "~/db";
import { WoofyFormSchema } from "./schemas";
import { woofysTable } from "~/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateWoofyMetadata(
  rarity: number,
  values: WoofyFormSchema
) {
  const updatedWoofy = await db
    .update(woofysTable)
    .set({ bio: values.backstory, name: values.name })
    .where(eq(woofysTable.rarity, rarity));
  revalidatePath(`/woofys/${rarity}`);
}
