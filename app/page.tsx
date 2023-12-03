import { eq, sql } from "drizzle-orm";
import Image from "next/image";
import { db } from "~/db";
import { woofysTable } from "~/db/schema";

export default async function Home() {
  const [unrevealedWoofys] = await db
    .select({ count: sql<number>`cast(count(${woofysTable.tokenId}) as int)` })
    .from(woofysTable)
    .where(eq(woofysTable.tokenId, 0))
    .execute();
  return (
    <div>
      <h1>MyWoofy</h1>
      <p>The unofficial explorer for the Woofy NFT Collection by CozyLabs.</p>
      <div>There are {unrevealedWoofys.count} Unrevealed Woofys</div>
    </div>
  );
}
