import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import { Suspense } from "react";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";
import { HeroBento } from "./_components/hero-bento";

export default async function Home() {
  const [unrevealedWoofys] = await db
    .select({ count: sql<number>`cast(count(${woofysTable.tokenId}) as int)` })
    .from(woofysTable)
    .where(eq(woofysTable.tokenId, 0))
    .execute();
  const randomOffset = Math.floor(Math.random() * (5555 - 0) + 0);
  console.log({ randomOffset });
  const heroWoofys = async () =>
    db.query.woofysTable.findMany({
      limit: 3,
      offset: randomOffset,
      columns: { imageUrl: true, rarity: true, name: true },
    });
  return (
    <div className="container mx-auto">
      <Suspense>
        <HeroBento data={heroWoofys()}>
          <div className="w-full h-full flex flex-col gap-2.5">
            <h1>MyWoofys</h1>
            <p>The unofficial explorer for the Woofy NFT Collection.</p>
            <div>
              There are {unrevealedWoofys.count} Unrevealed Woofys
              <sup>Updated every 5 minutes.</sup>
            </div>
          </div>
        </HeroBento>
      </Suspense>
    </div>
  );
}
