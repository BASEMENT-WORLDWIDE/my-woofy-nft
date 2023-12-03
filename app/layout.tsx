import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from "~/env.mjs";
import { Logo } from "./_components/logo";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const runtime = "edge";

export const metadata: Metadata = {
  title: "My Woofys",
  description: "The Unofficial Woofy NFT Explorer",
  metadataBase: new URL(`${env.NEXT_PUBLIC_METADATA_BASE_URL}`),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="py-4">
          <div className="container mx-auto flex items-center">
            <Link href="/">
              <Logo height={24} />
            </Link>
            <div className="flex items-center ml-auto">
              <Link
                href="/woofys"
                className="font-semibold hover:underline underline-offset-4"
              >
                Explorer
              </Link>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
