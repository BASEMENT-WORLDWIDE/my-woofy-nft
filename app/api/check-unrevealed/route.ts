import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { WoofyContract } from "~/models/woofy/contract";

export const runtime = "edge";

async function* fetchTokenRarity(rarities: number[]) {
  for (const rarity of rarities) {
    try {
      const response = await WoofyContract.getTokenIdForRarity(rarity);
      yield response;
    } catch (err) {
      console.error(err);
    }
  }
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
  const revealedWoofyTokenIds: { rarity: number | string; tokenId: number }[] =
    [];
  for await (const woofy of fetchTokenRarity(
    unrevealedWoofys.map((woofy) => woofy.rarity)
  )) {
    if (woofy.tokenId === 0) {
      continue;
    }
    revealedWoofyTokenIds.push(woofy);
  }
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
