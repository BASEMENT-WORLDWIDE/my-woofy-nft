import { ReactNode } from "react";

type ExplorerLayoutProps = {
  children: ReactNode;
  woofy: ReactNode;
};

export default function ExplorerLayout({
  children,
  woofy,
}: ExplorerLayoutProps) {
  return (
    <div className="container mx-auto flex flex-row gap-4">
      {children}
      {woofy}
    </div>
  );
}
