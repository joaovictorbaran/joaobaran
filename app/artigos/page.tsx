import type { Metadata } from "next";
import Link from "next/link";
import { Menu } from "@/components/menu";
import { PostCardCover } from "@/components/post-card-cover";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/format-date";
import { getPublishedPosts } from "@/lib/posts";
import { artigos } from "@/content/site";

export const metadata: Metadata = {
  title: artigos.title,
  description: artigos.lead,
  alternates: { canonical: "/artigos" },
};

export default function ArtigosPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <Menu />
      <main id="main-content">
        <section className="jb-artigos-list">
          <div className="jb-container">
            <Reveal>
              <h1 className="text-section text-text">{artigos.title}</h1>
              <p className="jb-artigos-list__lead text-body text-text-2">{artigos.lead}</p>
            </Reveal>

            <div className="jb-artigos-list__items">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 60}>
                  <Link href={`/artigos/${post.slug}`} className="jb-artigos-list__item">
                    <PostCardCover post={post} sizes="(min-width: 768px) 760px, 100vw" />
                    <span className="jb-artigos-list__item-date text-small text-text-3">{formatDate(post.date)}</span>
                    <h2 className="jb-artigos-list__item-title text-subtitle text-text">{post.title}</h2>
                    <p className="jb-artigos-list__item-summary text-body text-text-2">{post.summary}</p>
                  </Link>
                </Reveal>
              ))}
              <div className="jb-artigos-list__divider" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
