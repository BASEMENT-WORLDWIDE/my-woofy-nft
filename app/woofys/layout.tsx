import { ReactNode } from "react";
import { WoofySearch } from "./_components/WoofySearch";

type WoofysLayoutProps = {
  children: ReactNode;
};

export default function WoofysLayout({ children }: WoofysLayoutProps) {
  return (
    <>
      <WoofySearch />
      {children}
    </>
  );
}
