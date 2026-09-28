import { ImageResponse } from "next/og";
import { hero } from "@/content/site";
import { loadOgFonts, renderOgImage } from "@/lib/og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fonts = await loadOgFonts();

  return new ImageResponse(await renderOgImage(hero.title), { ...size, fonts });
}
