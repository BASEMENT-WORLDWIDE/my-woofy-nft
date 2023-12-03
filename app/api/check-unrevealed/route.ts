import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { WoofyContract } from "~/models/woofy/contract";

export const runtime = "edge";

export const GET = async (req: NextRequest) => {
  const unrevealedWoofys = await db.query.woofysTable.findMany({
    where(fields, ops) {
      return ops.eq(fields.tokenId, 0);
    },
  });
  const unrevealedWoofyTokenIds = await Promise.all(
    unrevealedWoofys.map((woofy) =>
      WoofyContract.getTokenIdForRarity(woofy.rarity)
    )
  );
  const revealedWoofyTokenIds = unrevealedWoofyTokenIds.filter(
    (woofy) => woofy.tokenId !== 0
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
  });

  return new Response("OK");
};
