import { describe, expect, it } from "vitest";
import { getPublicImageSize, parseImageSize } from "./image-size";

describe("parseImageSize", () => {
  it("lê as dimensões de um PNG", () => {
    const png = Buffer.alloc(33);
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]).copy(png);
    png.writeUInt32BE(1536, 16);
    png.writeUInt32BE(1024, 20);
    expect(parseImageSize(png)).toEqual({ width: 1536, height: 1024 });
  });

  it("lê as dimensões de um JPEG vertical, pulando outros segmentos", () => {
    const jpeg = Buffer.from([
      0xff, 0xd8, // início
      0xff, 0xe0, 0x00, 0x04, 0x00, 0x00, // APP0 com 2 bytes de dados
      0xff, 0xc0, 0x00, 0x11, 0x08, 0x04, 0x00, 0x02, 0x00, // SOF0: altura 1024, largura 512
      0x03, 0x01, 0x22, 0x00, 0x02, 0x11, 0x01, 0x03, 0x11, 0x01,
    ]);
    expect(parseImageSize(jpeg)).toEqual({ width: 512, height: 1024 });
  });

  it("devolve undefined para conteúdo que não é imagem", () => {
    expect(parseImageSize(Buffer.from("não sou uma imagem"))).toBeUndefined();
  });
});

describe("getPublicImageSize", () => {
  it("lê o arquivo real de public/ pelo conteúdo, não pela extensão", () => {
    expect(getPublicImageSize("/posts/no-code-vs-vibe-coding/capa.jpg")).toEqual({ width: 1536, height: 1024 });
    expect(getPublicImageSize("/posts/como-comecei-com-a-tecnologia/capa.png")).toEqual({ width: 1672, height: 941 });
  });

  it("devolve undefined quando o arquivo não existe", () => {
    expect(getPublicImageSize("/posts/nao-existe/capa.png")).toBeUndefined();
  });
});
