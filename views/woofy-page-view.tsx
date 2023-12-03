import Image from "next/image";
import { notFound } from "next/navigation";
import { db } from "~/db";

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
    <div>
      <Image src={woofy.imageUrl} width={256} height={256} alt={woofy.name} />
      <h1>{woofy.name}</h1>
    </div>
  );
}
