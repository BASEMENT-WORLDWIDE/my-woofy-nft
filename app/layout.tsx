import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { env } from "~/env.mjs";
import { Navigation } from "./_components/navigation";

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
        <Navigation />
        {children}
      </body>
    </html>
  );
}
