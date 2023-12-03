import Link from "next/link";
import { Logo } from "./logo";
import { GlobalSearch } from "./global-search";

export async function Navigation() {
  return (
    <nav className="py-4 sticky top-0 z-10 bg-black">
      <div className="container mx-auto flex items-center gap-4">
        <Link href="/">
          <Logo height={24} />
        </Link>
        <GlobalSearch />
        <div className="flex items-center ml-auto">
          <Link
            href="/explorer"
            className="font-semibold hover:underline underline-offset-4"
          >
            Explorer
          </Link>
        </div>
      </div>
    </nav>
  );
}
