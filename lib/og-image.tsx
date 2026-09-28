import fs from "node:fs/promises";
import path from "node:path";
import { contact } from "@/content/site";

// Fontes baixadas do Google Fonts (Inter, licença SIL OFL) e versionadas aqui porque
// o `next/og` (satori) precisa dos bytes da fonte para desenhar texto na imagem — não
// dá para reaproveitar o `next/font/google` usado no layout, que é só para o navegador.
const FONTS_DIR = path.join(process.cwd(), "assets/fonts");
const PHOTO_PATH = path.join(process.cwd(), "public/images/joao-baran-contact.jpg");

const BG = "#000000";
const TEXT = "#F5F5F7";
const TEXT_2 = "#D2D2D7";
const ACCENT = "#007AFF";

export async function loadOgFonts() {
  const [regular, bold] = await Promise.all([
    fs.readFile(path.join(FONTS_DIR, "Inter-400.woff")),
    fs.readFile(path.join(FONTS_DIR, "Inter-700.woff")),
  ]);

  return [
    { name: "Inter", data: regular, weight: 400 as const, style: "normal" as const },
    { name: "Inter", data: bold, weight: 700 as const, style: "normal" as const },
  ];
}

let cachedPhotoDataUrl: string | null = null;

async function loadPhotoDataUrl() {
  if (!cachedPhotoDataUrl) {
    const buffer = await fs.readFile(PHOTO_PATH);
    cachedPhotoDataUrl = `data:image/jpeg;base64,${buffer.toString("base64")}`;
  }
  return cachedPhotoDataUrl;
}

/**
 * Composição compartilhada da imagem de compartilhamento (Spec §11): fundo preto,
 * a frase recebida com o cursor azul ao lado, "João Baran", "Engenheiro de software"
 * e a foto de contato. Usada na home ("Construindo o futuro.") e em cada texto (o
 * próprio título no lugar da frase).
 */
export async function renderOgImage(headline: string) {
  const photo = await loadPhotoDataUrl();

  return (
    <div
      style={{
        display: "flex",
        width: 1200,
        height: 630,
        backgroundColor: BG,
        padding: 64,
        fontFamily: "Inter",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          flex: 1,
          paddingRight: 48,
        }}
      >
        <div style={{ display: "flex", alignItems: "flex-end" }}>
          <div style={{ fontSize: 56, fontWeight: 700, color: TEXT, lineHeight: 1.08 }}>{headline}</div>
          <div style={{ width: 8, height: 50, marginLeft: 14, borderRadius: 2, backgroundColor: ACCENT }} />
        </div>
        <div style={{ marginTop: 40, fontSize: 32, fontWeight: 700, color: TEXT }}>João Baran</div>
        <div style={{ marginTop: 10, fontSize: 26, fontWeight: 400, color: TEXT_2 }}>Engenheiro de software</div>
      </div>
      <div style={{ display: "flex", width: 380, height: 475, borderRadius: 24, overflow: "hidden" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- JSX do satori/next-og, não HTML de página */}
        <img src={photo} alt={contact.photoAlt} width={380} height={475} style={{ objectFit: "cover" }} />
      </div>
    </div>
  );
}
