import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";
import { getPublishedPosts } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getPublishedPosts();

  return [
    { url: siteUrl },
    { url: `${siteUrl}/textos` },
    ...posts.map((post) => ({
      url: `${siteUrl}/textos/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
