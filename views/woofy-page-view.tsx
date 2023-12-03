import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "~/db";
import { WoofyForm } from "./woofy-page-view/form";

type WoofyPageViewProps = {
  rarity: number;
};

export async function WoofyPageView({ rarity }: WoofyPageViewProps) {
  const woofy = await db.query.woofysTable.findFirst({
    where(fields, ops) {
      return ops.eq(fields.rarity, rarity);
    },
  });
  if (!woofy) {
    notFound();
  }
  return (
    <div className="container mx-auto">
      <aside className="max-w-xs flex flex-col gap-6">
        <Image
          src={woofy.imageUrl}
          width={256}
          height={256}
          alt={woofy.name}
          className="rounded-2xl w-full h-auto"
        />
        {woofy.tokenId !== 0 && (
          <Link
            href={`https://avax.hyperspace.xyz/collection/avax/5ad14893-3f7e-4be2-9205-d2122591c9f2?tokenAddress=0xbacd77ac0c456798e05de15999cb212129d90b70_${woofy.tokenId}`}
            rel="noopener noreferrer"
            target="_blank"
          >
            View on Hyperspace
          </Link>
        )}
        <WoofyForm
          initialValues={{
            name: woofy.name,
            backstory: woofy.bio || undefined,
          }}
          rarity={woofy.rarity}
        />
      </aside>
    </div>
  );
}
