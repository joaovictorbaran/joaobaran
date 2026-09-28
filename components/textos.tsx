import Link from "next/link";
import { formatDate } from "@/lib/format-date";
import { getFeaturedPosts } from "@/lib/posts";
import { textos } from "@/content/site";
import { Reveal } from "./reveal";

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true" className="jb-textos__arrow-icon">
      <path
        d="M4 10 L10 4 M5 4 H10 V9"
        stroke="currentColor"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Textos() {
  const posts = getFeaturedPosts();
  const isExternal = textos.appearance.href.startsWith("http");

  return (
    <section id="textos" className="jb-textos">
      <div className="jb-container">
        <Reveal>
          <h2 className="text-section text-text">{textos.title}</h2>
          <p className="jb-textos__lead text-body text-text-2">{textos.lead}</p>
        </Reveal>

        <div className="jb-textos__grid">
          {posts.map((post, index) => (
            <Reveal key={post.slug} delay={index * 80} className="jb-textos__card">
              <Link href={`/textos/${post.slug}`} className="jb-textos__card-link">
                <span className="text-small text-text-3">{formatDate(post.date)}</span>
                <h3 className="jb-textos__card-title text-subtitle text-text">{post.title}</h3>
                <p className="jb-textos__card-summary text-body text-text-2">{post.summary}</p>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="jb-textos__appearance">
          <a
            className="jb-textos__appearance-link"
            href={textos.appearance.href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
          >
            <span>
              <span className="text-small text-text-3">{textos.appearance.label}</span>
              <span className="jb-textos__appearance-title text-body text-text">{textos.appearance.title}</span>
            </span>
            <ArrowIcon />
          </a>
        </Reveal>

        <Reveal className="jb-textos__cta">
          <Link href="/textos" className="jb-btn2">
            {textos.viewAll}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
