import type { MetadataRoute } from "next";
import { siteUrl } from "@/content/site";

// Robôs de IA listados no Spec §11. O "*" abaixo já libera todo mundo, mas
// deixamos estes explícitos para documentar a intenção.
const AI_CRAWLERS = ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" }))],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
