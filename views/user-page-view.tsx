import { inArray } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { EthereumAddress } from "~/lib/utils";
import { Woofy } from "~/models/woofy";
import { WoofyContract } from "~/models/woofy/contract";

type UserPageViewProps = {
  publicAddress: EthereumAddress;
};

export async function UserPageView({ publicAddress }: UserPageViewProps) {
  const woofys = await Woofy.findAllByPublicAddress(publicAddress);
  const unrevealed = woofys.filter((woofy) => woofy.tokenId === 0);
  const revealed = woofys.filter((woofy) => woofy.tokenId !== 0);
  return (
    <div>
      <h1>{publicAddress}</h1>
      <h2>Woofys ({revealed.length})</h2>
      {revealed.map((woofy) => (
        <Link href={`/woofys/${woofy.rarity}`} key={woofy.rarity}>
          <Image
            src={woofy.imageUrl}
            alt={woofy.name}
            width={256}
            height={256}
          />
        </Link>
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
