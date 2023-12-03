import { notFound } from "next/navigation";
import { WoofyPageView } from "~/views/woofy-page-view";

type WoofyPeekProps = {
  params: {
    slug: string;
  };
};

export default async function WoofyPeek({ params }: WoofyPeekProps) {
  const woofyRarity = Math.abs(parseInt(params.slug));

  if (isNaN(woofyRarity)) {
    return notFound();
  }

  return <WoofyPageView rarity={woofyRarity} />;
}
