import { $do } from "~/lib/utils";
import fs from "node:fs/promises";
import { Woofy } from "~/models/woofy";
import { WoofyContract } from "~/models/woofy/contract";

const woofyRarities = Array.from({ length: 5555 }).map((_, idx) => idx + 1);

const specialLookup: Record<string, number> = {
  Scout: 1,
  Ace: 2,
  Ziggy: 3,
  Bolt: 4,
  Coco: 5,
  Dottie: 6,
  Echo: 7,
  Ollie: 8,
};

const parseRarity = (name: string) => {
  const rarityFromName = parseInt(name.split("#")[1]);
  const rarity = specialLookup[name] ?? rarityFromName;
  return rarity;
};

async function* fetchMetadata(rarities: number[]) {
  for (const rarity of rarities) {
    try {
      const metadata = await Woofy.fetchMetadataForRarity(rarity);
      if (metadata.isJust()) {
        console.log(`fetched rarity: ${rarity}`);
        yield metadata.extract();
      }
    } catch (err) {
      console.error(err);
    }
  }
}

$do(async () => {
  let count = 0;
  const woofys = [];
  for await (const metadata of fetchMetadata(woofyRarities)) {
    const rarity = parseRarity(metadata.name);
    const { tokenId } = await WoofyContract.getTokenIdForRarity(rarity);
    const traits = metadata.attributes.map((trait) => ({
      type: trait.trait_type,
      name: trait.value,
    }));
    const woofy = {
      tokenId,
      rarity,
      imageUrl: metadata.image,
      name: metadata.name,
      traits,
    };
    woofys.push(woofy);
    console.log(`completed: ${woofy.rarity}`);
    count++;
  }
  await fs.writeFile(
    `${process.cwd()}/woofys-metadata.json`,
    JSON.stringify(woofys),
    { encoding: "utf-8" }
  );
});
