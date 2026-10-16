import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import { getFeaturedPosts } from "@/lib/posts";
import { artigos } from "@/content/site";
import { PostCardCover } from "./post-card-cover";
import { Reveal } from "./reveal";

export function Artigos() {
  const posts = getFeaturedPosts();

  return (
    <section id="artigos" className="jb-artigos">
      <div className="jb-container">
        <Reveal>
          <h2 className="text-section text-text">{artigos.title}</h2>
          <p className="jb-artigos__lead text-body text-text-2">{artigos.lead}</p>
        </Reveal>

        <div className="jb-artigos__grid">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80} className="jb-artigos__card">
              <Link href={`/artigos/${post.slug}`} className="jb-artigos__card-link">
                <PostCardCover post={post} sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="jb-artigos__card-body">
                  <span className="text-small text-text-3">{formatDate(post.date)}</span>
                  <h3 className="jb-artigos__card-title text-subtitle text-text">{post.title}</h3>
                  <p className="jb-artigos__card-summary text-body text-text-2">{post.summary}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="jb-artigos__cta">
          <Link href="/artigos" className="jb-btn2">
            {artigos.viewAll}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
