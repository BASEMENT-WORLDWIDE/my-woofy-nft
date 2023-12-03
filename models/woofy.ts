import { z } from "zod";
import { Just, Nothing } from "purify-ts/Maybe";

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
