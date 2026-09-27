import fs from "node:fs";
import path from "node:path";

export type Post = {
  slug: string;
  title: string;
  date: string;
  summary: string;
  featured: boolean;
  draft: boolean;
  content: string;
  readingTime: number;
};

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const WORDS_PER_MINUTE = 200;
const REQUIRED_FIELDS = ["title", "date", "summary", "featured", "draft"] as const;

function isProduction() {
  return process.env.NODE_ENV === "production";
}

function stripQuotes(value: string) {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

export function parseFrontmatter(fileName: string, raw: string) {
  const normalized = raw.replace(/\r\n/g, "\n");
  const match = normalized.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`content/posts/${fileName}: cabeçalho de front matter ausente ou mal formatado.`);
  }

  const [, header, body] = match;
  const fields: Record<string, string> = {};

  for (const line of header.split("\n")) {
    if (!line.trim()) continue;
    const separatorIndex = line.indexOf(":");
    if (separatorIndex === -1) {
      throw new Error(`content/posts/${fileName}: linha inválida no cabeçalho: "${line}".`);
    }
    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1).trim();
    fields[key] = value;
  }

  for (const field of REQUIRED_FIELDS) {
    if (fields[field] === undefined || fields[field] === "") {
      throw new Error(`content/posts/${fileName}: campo obrigatório "${field}" ausente no cabeçalho.`);
    }
  }

  const title = stripQuotes(fields.title);
  const summary = stripQuotes(fields.summary);
  const dateRaw = stripQuotes(fields.date);

  if (Number.isNaN(new Date(dateRaw).getTime())) {
    throw new Error(`content/posts/${fileName}: campo "date" inválido: "${dateRaw}".`);
  }

  if (fields.featured !== "true" && fields.featured !== "false") {
    throw new Error(`content/posts/${fileName}: campo "featured" precisa ser true ou false.`);
  }

  if (fields.draft !== "true" && fields.draft !== "false") {
    throw new Error(`content/posts/${fileName}: campo "draft" precisa ser true ou false.`);
  }

  return {
    title,
    date: dateRaw,
    summary,
    featured: fields.featured === "true",
    draft: fields.draft === "true",
    content: body.trim(),
  };
}

export function getReadingTime(content: string) {
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(wordCount / WORDS_PER_MINUTE));
}

function readPost(fileName: string): Post {
  const slug = fileName.replace(/\.md$/, "");
  const raw = fs.readFileSync(path.join(POSTS_DIR, fileName), "utf-8");
  const parsed = parseFrontmatter(fileName, raw);

  return {
    slug,
    ...parsed,
    readingTime: getReadingTime(parsed.content),
  };
}

function sortByDateDesc(posts: Post[]) {
  return [...posts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getAllPosts(): Post[] {
  const fileNames = fs.readdirSync(POSTS_DIR).filter((fileName) => fileName.endsWith(".md"));
  return sortByDateDesc(fileNames.map(readPost));
}

export function getPublishedPosts(): Post[] {
  const posts = getAllPosts();
  return isProduction() ? posts.filter((post) => !post.draft) : posts;
}

export function getPostBySlug(slug: string): Post | undefined {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function selectFeatured(posts: Post[], limit = 3): Post[] {
  const featured = posts.filter((post) => post.featured).slice(0, limit);

  if (featured.length >= limit) {
    return featured;
  }

  const featuredSlugs = new Set(featured.map((post) => post.slug));
  const fillers = posts.filter((post) => !featuredSlugs.has(post.slug)).slice(0, limit - featured.length);

  return [...featured, ...fillers];
}

export function getFeaturedPosts(limit = 3): Post[] {
  return selectFeatured(getPublishedPosts(), limit);
}
