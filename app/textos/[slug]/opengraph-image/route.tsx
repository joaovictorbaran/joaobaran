import { ImageResponse } from "next/og";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { loadOgFonts, renderOgImage } from "@/lib/og-image";

// Imagem de compartilhamento gerada (título + foto), usada só nos textos sem `cover`.
// Fica numa rota (e não no arquivo `opengraph-image.tsx`) porque o arquivo de convenção
// sempre vence o `generateMetadata`, e os textos com capa precisam apontar para a capa.
export const dynamicParams = false;

const size = { width: 1200, height: 630 };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const fonts = await loadOgFonts();

  return new ImageResponse(await renderOgImage(post?.title ?? "João Baran"), { ...size, fonts });
}
