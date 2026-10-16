import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { JsonLd } from "@/components/json-ld";
import { Menu } from "@/components/menu";
import { formatDate } from "@/lib/format-date";
import { getPublicImageSize } from "@/lib/image-size";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { getArticleJsonLd } from "@/lib/structured-data";
import { artigos } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {};
  }

  // Com capa, ela é a imagem de compartilhamento; sem capa, vale a imagem gerada (rota opengraph-image).
  const coverSize = post.cover ? getPublicImageSize(post.cover) : undefined;
  const shareImage = post.cover
    ? { url: post.cover, alt: post.coverAlt ?? post.title, ...coverSize }
    : { url: `/artigos/${post.slug}/opengraph-image`, width: 1200, height: 630, alt: post.title };

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/artigos/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      url: `/artigos/${post.slug}`,
      publishedTime: post.date,
      images: [shareImage],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary,
      images: [shareImage],
    },
  };
}

// Proporção padrão só para imagens que não são locais ou cujo arquivo não foi encontrado.
const FALLBACK_IMAGE_SIZE = { width: 1200, height: 675 };

function ProseImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  const { width, height } = (src.startsWith("/") && getPublicImageSize(src)) || FALLBACK_IMAGE_SIZE;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={width}
      height={height}
      sizes="(min-width: 768px) 680px, 100vw"
      className="jb-prose__image"
    />
  );
}

const markdownComponents: Components = {
  img: ({ src, alt }) => <ProseImage src={typeof src === "string" ? src : undefined} alt={alt} />,
  a: ({ href, children }) => {
    const isExternal = href?.startsWith("http");
    return (
      <a
        href={href}
        className="jb-link"
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  },
};

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function TextoPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const coverSize = post.cover ? getPublicImageSize(post.cover) : undefined;

  return (
    <>
      <JsonLd data={getArticleJsonLd(post)} />
      <Menu />
      <main id="main-content" className="jb-texto">
        <article className="jb-texto__article">
          <Link href="/artigos" className="jb-link">
            {artigos.title}
          </Link>

          <h1 className="jb-texto__title text-section text-text">{post.title}</h1>
          <div className="jb-texto__meta text-small text-text-3">
            {formatDate(post.date)} · {post.readingTime} min de leitura
          </div>

          {post.cover ? (
            // Sem coverAlt, a capa é decorativa (alt vazio): o título já diz do que o texto trata.
            <Image
              src={post.cover}
              alt={post.coverAlt ?? ""}
              width={coverSize?.width ?? 1536}
              height={coverSize?.height ?? 1024}
              priority
              sizes="(min-width: 768px) 680px, 100vw"
              className="jb-texto__cover"
            />
          ) : null}

          <div className="jb-prose">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>

          <div className="jb-texto__invite">
            <p className="text-subtitle text-text">{artigos.invite.title}</p>
            <div className="jb-texto__invite-actions">
              <Link className="jb-btn" href="/#contato">
                {artigos.invite.cta}
              </Link>
              <Link href="/artigos" className="jb-link">
                {artigos.invite.viewOthers}
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
