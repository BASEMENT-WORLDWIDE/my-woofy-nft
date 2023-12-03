import "dotenv/config";
import { db } from "~/db";
import { traitsTable, woofysTable, woofysTraitsTable } from "~/db/schema";
import { $do } from "~/lib/utils";
import fs from "node:fs/promises";

$do(async () => {
  // const woofys = await $do(async () => {
  //   const _woofys = await fs.readFile(`${process.cwd()}/woofys-metadata.json`, {
  //     encoding: "utf-8",
  //   });
  //   return JSON.parse(_woofys) as {
  //     tokenId: number;
  //     rarity: number;
  //     imageUrl: string;
  //     name: string;
  //     traits: { type: string; name: string }[];
  //   }[];
  // });
  // const woofyTraitMap = woofys.reduce<Record<string, Set<string>>>(
  //   (traits, woofy) => {
  //     woofy.traits.forEach((trait) => {
  //       if (!traits[trait.type]) {
  //         traits[trait.type] = new Set([trait.name]);
  //         return;
  //       }
  //       traits[trait.type].add(trait.name);
  //     });
  //     return traits;
  //   },
  //   {}
  // );
  // const woofyTraits = Object.entries(woofyTraitMap).flatMap(
  //   ([traitType, traits]) =>
  //     Array.from(traits).flatMap((trait) => ({ type: traitType, name: trait }))
  // );
  // await db.insert(traitsTable).values(woofyTraits).onConflictDoNothing();
  // const traits = await db.query.traitsTable.findMany();
  // await db
  //   .insert(woofysTable)
  //   .values(
  //     woofys.map((woofy) => ({
  //       rarity: woofy.rarity,
  //       imageUrl: woofy.imageUrl,
  //       name: woofy.name,
  //       tokenId: woofy.tokenId,
  //     }))
  //   )
  //   .onConflictDoNothing();
  // const associateWoofy = async (woofy: (typeof woofys)[number]) => {
  //   const _traits = traits.filter((trait) =>
  //     woofy.traits.find(
  //       (wTrait) => wTrait.name === trait.name && wTrait.type === trait.type
  //     )
  //   );
  //   const woofyTraits = _traits.map((trait) => ({
  //     traitId: trait.id,
  //     woofyId: woofy.rarity,
  //   }));
  //   return woofyTraits;
  // };
  // let associations: { traitId: number; woofyId: number }[] = [];
  // for (let i = 0; i < woofys.length; i++) {
  //   const woofy = woofys[i];
  //   const woofyTraits = await associateWoofy(woofy);
  //   associations = associations.concat(woofyTraits);
  //   console.log(`associated: ${i} / ${woofys.length}`);
  //   if (i % 50 === 0) {
  //     await db
  //       .insert(woofysTraitsTable)
  //       .values(associations)
  //       .onConflictDoNothing();
  //     associations = [];
  //   }
  // }
  // console.log("fin.");
});
