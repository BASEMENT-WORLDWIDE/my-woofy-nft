import { z } from "zod";
import { Just, Nothing } from "purify-ts/Maybe";
import { EthereumAddress } from "~/lib/utils";
import { WoofyContract } from "./woofy/contract";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { inArray } from "drizzle-orm";

const METADATA_BASE_URI = "https://static.cozyverse.xyz/woofys/metadata";

const woofyMetadata = z.object({
  name: z.string(),
  image: z.string(),
  attributes: z.array(
    z.object({
      trait_type: z.string(),
      value: z.string(),
    })
  ),
});

export type WoofyMetadata = z.infer<typeof woofyMetadata>;

export class Woofy {
  static async findAllByPublicAddress(publicAddress: EthereumAddress) {
    const tokens = await WoofyContract.getWoofysForOwner(publicAddress);

    const woofyRarities = await Promise.all(
      tokens.tokenIds.map((tokenId) =>
        WoofyContract.getRarityForTokenId(tokenId)
      )
    );
    let woofys = await db.query.woofysTable.findMany({
      where(fields, ops) {
        return ops.inArray(fields.rarity, woofyRarities);
      },
    });

    // this is kind of dumb, but whatever.
    if (woofys.some((woofy) => woofy.ownerAddress !== publicAddress)) {
      const updatedWoofys = woofys
        .filter((woofy) => woofy.ownerAddress !== publicAddress)
        .map((woofy) => woofy.rarity);
      await db
        .update(woofysTable)
        .set({ ownerAddress: publicAddress })
        .where(inArray(woofysTable.rarity, updatedWoofys));
    }

    woofys = await db.query.woofysTable.findMany({
      where(fields, ops) {
        return ops.eq(fields.ownerAddress, publicAddress);
      },
    });

    return woofys;
  }

  static async fetchMetadataForRarity(rarity: number | string) {
    const response = await fetch(`${METADATA_BASE_URI}/${rarity}.json`);
    const data = (await response.json()) as WoofyMetadata;
    const metadata = woofyMetadata.safeParse(data);
    if (!metadata.success) {
      return Nothing;
    }
    return Just(metadata.data);
  }
}
