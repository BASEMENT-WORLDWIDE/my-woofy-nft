import { notFound } from "next/navigation";
import { isWalletAddress } from "~/lib/utils";
import { UserPageView } from "~/views/user-page-view";
import { WoofyPageView } from "~/views/woofy-page-view";

type WoofyPageParams = {
  params: {
    slug: string;
  };
};

type WoofyPageProps = WoofyPageParams;

export default async function WoofyPage({ params }: WoofyPageProps) {
  if (isWalletAddress(params.slug)) {
    return <UserPageView publicAddress={params.slug} />;
  }

  const woofyRarity = Math.abs(parseInt(params.slug));

  if (isNaN(woofyRarity)) {
    return notFound();
  }

  return <WoofyPageView rarity={woofyRarity} />;
}
