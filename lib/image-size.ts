import fs from "node:fs";
import path from "node:path";

export type ImageSize = { width: number; height: number };

const PNG_SIGNATURE = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

function readPng(buffer: Buffer): ImageSize | undefined {
  if (buffer.length < 24 || !buffer.subarray(0, 8).equals(PNG_SIGNATURE)) return undefined;
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

function readJpeg(buffer: Buffer): ImageSize | undefined {
  if (buffer.length < 4 || buffer[0] !== 0xff || buffer[1] !== 0xd8) return undefined;

  let offset = 2;
  while (offset + 9 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      offset += 1;
      continue;
    }
    const marker = buffer[offset + 1];
    // Marcadores sem tamanho (preenchimento, RSTn, TEM).
    if (marker === 0xff || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += marker === 0xff ? 1 : 2;
      continue;
    }
    const isStartOfFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isStartOfFrame) {
      return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
    }
    offset += 2 + buffer.readUInt16BE(offset + 2);
  }
  return undefined;
}

/** Lê largura e altura de um PNG ou JPEG pelo conteúdo do arquivo (e não pela extensão). */
export function parseImageSize(buffer: Buffer): ImageSize | undefined {
  return readPng(buffer) ?? readJpeg(buffer);
}

/** Dimensões reais de uma imagem de `public/` (ex.: "/posts/<slug>/capa.png"), lidas no build. */
export function getPublicImageSize(publicPath: string): ImageSize | undefined {
  const filePath = path.join(process.cwd(), "public", publicPath);
  try {
    return parseImageSize(fs.readFileSync(filePath));
  } catch {
    return undefined;
  }
}
