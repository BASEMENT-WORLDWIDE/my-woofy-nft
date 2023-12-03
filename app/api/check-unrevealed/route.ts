import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { WoofyContract } from "~/models/woofy/contract";

export const runtime = "edge";

function batchItems<T>(items: T[], batchSize: number): T[][] {
  const result: T[][] = [];

  for (let i = 0; i < items.length; i += batchSize) {
    const batch = items.slice(i, i + batchSize);
    result.push(batch);
  }

  return result;
}

export const GET = async (req: NextRequest) => {
  const unrevealedWoofys = await db.query.woofysTable.findMany({
    where(fields, ops) {
      return ops.eq(fields.tokenId, 0);
    },
    columns: {
      rarity: true,
    },
  });
  const batchedUnrevealedWoofys = batchItems(unrevealedWoofys, 40);
  const encoder = new TextEncoder();
  const readableStream = new ReadableStream({
    async start(controller) {
      for (const batch of batchedUnrevealedWoofys) {
        const revealedWoofyTokenIds = await Promise.all(
          batch.map((woofy) => WoofyContract.getTokenIdForRarity(woofy.rarity))
        );
        revealedWoofyTokenIds.forEach(async (woofy) => {
          const rarity = (() => {
            if (typeof woofy.rarity === "string") {
              return parseInt(woofy.rarity);
            }
            return woofy.rarity;
          })();
          await db
            .update(woofysTable)
            .set({ tokenId: woofy.tokenId })
            .where(eq(woofysTable.rarity, rarity));
          controller.enqueue(encoder.encode(`<p>${woofy.rarity}</p>`));
        });
      }
      controller.close();
    },
  });

  return new Response(readableStream, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
};
