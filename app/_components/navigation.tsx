import Link from "next/link";
import { Logo } from "./logo";
import { GlobalSearch } from "./global-search";
import { buttonVariants } from "~/components/ui/button";

export async function Navigation() {
  return (
    <nav className="py-4 sticky top-0 z-10 bg-background bg-opacity-90 backdrop-blur-lg">
      <div className="container mx-auto flex items-center gap-4">
        <Link href="/">
          <Logo height={24} className="fill-foreground" />
        </Link>
        <GlobalSearch />
        <div className="flex items-center ml-auto">
          <Link href="/explore" className={buttonVariants({ variant: "link" })}>
            Explore
          </Link>
        </div>
      </div>
    </nav>
  );
}
