import { channels, siteUrl, status } from "@/content/site";
import type { Post } from "./posts";

const PERSON_ID = `${siteUrl}/#person`;

export function getPersonJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": PERSON_ID,
    name: "João Baran",
    url: siteUrl,
    jobTitle: status.role,
    worksFor: {
      "@type": "Organization",
      name: status.company,
    },
    // Só os canais com URL real (ver BAR-21): um canal ainda pendente ficaria com href "#".
    sameAs: channels.map((channel) => channel.href).filter((href) => href.startsWith("http")),
  };
}

export function getArticleJsonLd(post: Post) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    datePublished: post.date,
    author: { "@id": PERSON_ID },
    image: `${siteUrl}/textos/${post.slug}/opengraph-image`,
  };
}
