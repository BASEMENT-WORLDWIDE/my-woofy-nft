import Image from "next/image";
import { IWoofy } from "~/db/schema";

type WoofyCardProps = {
  woofy: IWoofy;
};

export function WoofyCard({ woofy }: WoofyCardProps) {
  return (
    <div>
      <figure className="relative rounded-lg overflow-hidden bg-white">
        {woofy.tokenId === 0 && (
          <div className="absolute top-0 right-0 text-xs p-1 font-semibold tracking-wide bg-red-600 rounded-sm text-red-50">
            Unrevealed
          </div>
        )}
        <Image
          src={woofy.imageUrl}
          alt={woofy.name}
          width={256}
          height={256}
          className="object-cover"
        />
        <figcaption className="text-black font-medium p-1 text-sm">
          {woofy.name}
        </figcaption>
      </figure>
    </div>
  );
}
