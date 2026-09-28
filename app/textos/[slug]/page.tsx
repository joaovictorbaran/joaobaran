import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import type { Components } from "react-markdown";
import { Menu } from "@/components/menu";
import { formatDate } from "@/lib/format-date";
import { getPostBySlug, getPublishedPosts } from "@/lib/posts";
import { textos } from "@/content/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

function ProseImage({ src, alt }: { src?: string; alt?: string }) {
  if (!src) return null;
  return (
    <Image
      src={src}
      alt={alt ?? ""}
      width={1200}
      height={675}
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

  return (
    <>
      <Menu />
      <main id="main-content" className="jb-texto">
        <article className="jb-texto__article">
          <Link href="/textos" className="jb-link">
            {textos.title}
          </Link>

          <h1 className="jb-texto__title text-section text-text">{post.title}</h1>
          <div className="jb-texto__meta text-small text-text-3">
            {formatDate(post.date)} · {post.readingTime} min de leitura
          </div>

          <div className="jb-prose">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>

          <div className="jb-texto__invite">
            <p className="text-subtitle text-text">{textos.invite.title}</p>
            <div className="jb-texto__invite-actions">
              <Link className="jb-btn" href="/#contato">
                {textos.invite.cta}
              </Link>
              <Link href="/textos" className="jb-link">
                {textos.invite.viewOthers}
              </Link>
            </div>
          </div>
        </article>
      </main>
    </>
  );
}
