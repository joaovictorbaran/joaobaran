import Link from "next/link";
import { Menu } from "@/components/menu";
import { Reveal } from "@/components/reveal";
import { formatDate } from "@/lib/format-date";
import { getPublishedPosts } from "@/lib/posts";
import { textos } from "@/content/site";

export default function TextosPage() {
  const posts = getPublishedPosts();

  return (
    <>
      <Menu />
      <main id="main-content">
        <section className="jb-textos-list">
          <div className="jb-container">
            <Reveal>
              <h1 className="text-section text-text">{textos.title}</h1>
              <p className="jb-textos-list__lead text-body text-text-2">{textos.lead}</p>
            </Reveal>

            <div className="jb-textos-list__items">
              {posts.map((post, index) => (
                <Reveal key={post.slug} delay={index * 60}>
                  <Link href={`/textos/${post.slug}`} className="jb-textos-list__item">
                    <span className="text-small text-text-3">{formatDate(post.date)}</span>
                    <h2 className="jb-textos-list__item-title text-subtitle text-text">{post.title}</h2>
                    <p className="jb-textos-list__item-summary text-body text-text-2">{post.summary}</p>
                  </Link>
                </Reveal>
              ))}
              <div className="jb-textos-list__divider" />
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
