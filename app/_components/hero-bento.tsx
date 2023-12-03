import Image from "next/image";
import { ReactNode } from "react";

type HeroWoofy = { imageUrl: string; rarity: number; name: string };

type HeroBentoProps = {
  data: Promise<HeroWoofy[]>;
  children?: ReactNode;
};

export async function HeroBento({ children, data }: HeroBentoProps) {
  const [woofyA, woofyB, woofyC] = await data;
  return (
    <div className="grid auto-rows-[192px] grid-cols-3 gap-4">
      <div className="row-span-1 rounded-2xl bg-slate-500 flex flex-row items-center p-4 relative">
        <Image
          src={woofyA.imageUrl}
          alt={woofyA.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="row-span-2 rounded-2xl col-span-2 bg-slate-500 flex flex-row items-center p-4 relative">
        {children}
      </div>
      <div className="col-span-1 bg-slate-500 rounded-2xl row-span-2 flex flex-row items-center p-4 relative">
        <Image
          src={woofyB.imageUrl}
          alt={woofyB.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
      <div className="col-span-2 bg-slate-500 rounded-2xl row-span-1 flex flex-row items-center p-4 relative">
        <Image
          src={woofyC.imageUrl}
          alt={woofyC.name}
          fill
          className="object-cover rounded-xl"
        />
      </div>
    </div>
  );
}
