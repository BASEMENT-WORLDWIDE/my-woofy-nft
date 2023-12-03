import { ReactNode } from "react";

type WoofysLayoutProps = {
  children: ReactNode;
};

export default function WoofysLayout({ children }: WoofysLayoutProps) {
  return <>{children}</>;
}
