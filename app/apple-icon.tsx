import { ImageResponse } from "next/og";
import { loadOgFonts } from "@/lib/og-image";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default async function AppleIcon() {
  const fonts = await loadOgFonts();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: 180,
          height: 180,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Inter",
            fontWeight: 700,
            fontSize: 84,
            color: "#F5F5F7",
            letterSpacing: -4,
          }}
        >
          JB
        </div>
      </div>
    ),
    { ...size, fonts },
  );
}
