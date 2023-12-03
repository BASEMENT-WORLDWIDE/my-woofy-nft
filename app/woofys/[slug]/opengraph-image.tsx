/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import { db } from "~/db";
import { isWalletAddress } from "~/lib/utils";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Woofy NFT";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image({ params }: { params: { slug: string } }) {
  // Font
  const interSemiBold = fetch(
    new URL("../../../Inter-SemiBold.ttf", import.meta.url)
  ).then((res) => res.arrayBuffer());

  if (isWalletAddress(params.slug)) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.slug}
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  }

  const woofyRarity = Math.abs(parseInt(params.slug));

  if (isNaN(woofyRarity)) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Does not exist
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  }

  const woofy = await db.query.woofysTable.findFirst({
    where(fields, ops) {
      return ops.eq(fields.rarity, woofyRarity);
    },
  });

  if (!woofy) {
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            fontSize: 128,
            background: "white",
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Does not exist
        </div>
      ),
      // ImageResponse options
      {
        // For convenience, we can re-use the exported opengraph-image
        // size config to also set the ImageResponse's width and height.
        ...size,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  }

  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          fontSize: 128,
          backgroundImage: `url(${woofy.imageUrl})`,
          backgroundSize: "100% 200%",
          backgroundRepeat: "no-repeat",
          filter: "blur(50)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            filter: "blur(0)",
            gap: 12,
          }}
        >
          <img
            src={woofy.imageUrl}
            alt={woofy.name}
            width={256}
            height={256}
            style={{
              borderRadius: 12,
              boxShadow: "0 2px 12px rgba(0, 0, 0, 0.4)",
            }}
          />
          <h1
            style={{
              fontSize: 72,
              margin: 0,
              textShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
              color: "white",
            }}
          >
            {woofy.name}
          </h1>
        </div>
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
      fonts: [
        {
          name: "Inter",
          data: await interSemiBold,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
