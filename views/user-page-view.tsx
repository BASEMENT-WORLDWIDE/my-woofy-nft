import Image from "next/image";
import { db } from "~/db";
import { EthereumAddress } from "~/lib/utils";
import { WoofyContract } from "~/models/woofy/contract";

type UserPageViewProps = {
  publicAddress: EthereumAddress;
};

export async function UserPageView({ publicAddress }: UserPageViewProps) {
  const tokens = await WoofyContract.getWoofysForOwner(publicAddress);
  const woofyRarities = await Promise.all(
    tokens.tokenIds.map((tokenId) => WoofyContract.getRarityForTokenId(tokenId))
  );
  const woofys = await db.query.woofysTable.findMany({
    where(fields, ops) {
      return ops.inArray(fields.rarity, woofyRarities);
    },
  });
  const unrevealed = woofyRarities.filter((rarity) => rarity === 0);
  return (
    <div>
      <h1>{publicAddress}</h1>
      <h2>Woofys ({woofys.length})</h2>
      {woofys.map((woofy) => (
        <div key={woofy.rarity}>
          <Image
            src={woofy.imageUrl}
            alt={woofy.name}
            width={256}
            height={256}
          />
        </div>
      ))}
      <h3>Unrevealed ({unrevealed.length})</h3>
      {unrevealed.map((_unrevealed, index) => (
        <div key={index}>
          <Image
            src={"https://static.cozyverse.xyz/woofys/images/00000.gif"}
            alt={"Unrevealed Woofy"}
            width={256}
            height={256}
          />
        </div>
      ))}
    </div>
  );
}
