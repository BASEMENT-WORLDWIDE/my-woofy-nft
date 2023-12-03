import { db } from "~/db";
import { WoofyCard } from "./_components/woofy-card";
import Link from "next/link";
import { FilterDock } from "./_components/filter-dock";

type ExplorerPageProps = {
  searchParams: {};
};

export default async function ExplorerPage({
  searchParams,
}: ExplorerPageProps) {
  const woofys = await db.query.woofysTable.findMany();
  return (
    <>
      <div className="@container w-full">
        <div className="grid @lg:grid-cols-5 @4xl:grid-cols-11 gap-4">
          {woofys.map((woofy) => (
            <Link key={woofy.rarity} href={`/woofys/${woofy.rarity}`}>
              <WoofyCard woofy={woofy} />
            </Link>
          ))}
        </div>
      </div>
      <FilterDock />
    </>
  );
}
