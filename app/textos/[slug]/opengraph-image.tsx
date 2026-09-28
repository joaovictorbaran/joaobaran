import { ImageResponse } from "next/og";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { loadOgFonts, renderOgImage } from "@/lib/og-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

type ImageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Image({ params }: ImageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  const fonts = await loadOgFonts();

  return new ImageResponse(await renderOgImage(post?.title ?? "João Baran"), { ...size, fonts });
}
