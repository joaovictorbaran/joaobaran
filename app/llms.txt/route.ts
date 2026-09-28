import { NextResponse } from "next/server";
import { channels, seo, siteUrl } from "@/content/site";
import { getPublishedPosts } from "@/lib/posts";

export const dynamic = "force-static";

function buildLlmsTxt() {
  const posts = getPublishedPosts();
  const realChannels = channels.filter((channel) => channel.href.startsWith("http"));

  const lines = [
    "João Baran",
    "",
    seo.homeDescription,
    "",
    "Canais:",
    ...realChannels.map((channel) => `- ${channel.name}: ${channel.href}`),
    "",
    "Textos:",
    ...posts.map((post) => `- ${post.title}: ${siteUrl}/textos/${post.slug} — ${post.summary}`),
  ];

  return lines.join("\n");
}

export function GET() {
  return new NextResponse(buildLlmsTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
