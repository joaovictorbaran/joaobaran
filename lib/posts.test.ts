import fs from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  getAllPosts,
  getFeaturedPosts,
  getPostBySlug,
  getPublishedPosts,
  getReadingTime,
  parseFrontmatter,
  selectFeatured,
  type Post,
} from "./posts";

// A leitura do sistema de arquivos é isolada (não depende do conteúdo real de
// content/posts/, que muda conforme os textos publicados) para os testes abaixo
// que exercitam getAllPosts/getPostBySlug/getPublishedPosts de ponta a ponta.
vi.mock("node:fs", () => ({
  default: {
    readdirSync: vi.fn(),
    readFileSync: vi.fn(),
  },
}));

// Tipados como funções simples para não brigar com as sobrecargas do node:fs.
const mockedReaddirSync = fs.readdirSync as unknown as ReturnType<typeof vi.fn<(dir: string) => string[]>>;
const mockedReadFileSync = fs.readFileSync as unknown as ReturnType<typeof vi.fn<(path: string) => string>>;

const FIXTURE_POSTS: Record<string, string> = {
  "destaque.md": `---
title: "Texto de exemplo"
date: 2026-01-10
summary: "Resumo do texto de exemplo."
featured: true
draft: false
---

Corpo do texto de exemplo.
`,
  "rascunho.md": `---
title: "Texto rascunho"
date: 2026-02-01
summary: "Resumo do rascunho."
featured: false
draft: true
---

Corpo do rascunho.
`,
};

function makePost(overrides: Partial<Post>): Post {
  return {
    slug: "post",
    title: "Post",
    date: "2026-01-01",
    summary: "Resumo",
    featured: false,
    draft: false,
    content: "Corpo",
    readingTime: 1,
    ...overrides,
  };
}

const VALID_FRONTMATTER = `---
title: "Meu texto"
date: 2026-01-15
summary: "Um resumo qualquer."
featured: true
draft: false
---

Corpo do texto.
`;

describe("parseFrontmatter", () => {
  it("lê os campos do cabeçalho e o corpo", () => {
    const result = parseFrontmatter("exemplo.md", VALID_FRONTMATTER);

    expect(result).toEqual({
      title: "Meu texto",
      date: "2026-01-15",
      summary: "Um resumo qualquer.",
      featured: true,
      draft: false,
      content: "Corpo do texto.",
    });
  });

  it("lança um erro claro quando o cabeçalho está ausente", () => {
    expect(() => parseFrontmatter("sem-cabecalho.md", "Só corpo, sem front matter.")).toThrow(
      /cabeçalho de front matter ausente/,
    );
  });

  it.each(["title", "date", "summary", "featured", "draft"])(
    "lança um erro claro quando falta o campo obrigatório %s",
    (field) => {
      const withoutField = VALID_FRONTMATTER.split("\n")
        .filter((line) => !line.startsWith(`${field}:`))
        .join("\n");

      expect(() => parseFrontmatter("incompleto.md", withoutField)).toThrow(
        new RegExp(`campo obrigatório "${field}"`),
      );
    },
  );

  it("lança um erro claro quando a data é inválida", () => {
    const invalidDate = VALID_FRONTMATTER.replace("date: 2026-01-15", "date: não é uma data");
    expect(() => parseFrontmatter("data-invalida.md", invalidDate)).toThrow(/campo "date" inválido/);
  });

  it.each(["featured", "draft"])("lança um erro claro quando %s não é true nem false", (field) => {
    const invalid = VALID_FRONTMATTER.replace(`${field}: ${field === "featured" ? "true" : "false"}`, `${field}: talvez`);
    expect(() => parseFrontmatter("booleano-invalido.md", invalid)).toThrow(
      new RegExp(`campo "${field}" precisa ser true ou false`),
    );
  });
});

describe("getReadingTime", () => {
  it("calcula cerca de 200 palavras por minuto, arredondando para cima", () => {
    const twoHundredWords = Array.from({ length: 200 }, () => "palavra").join(" ");
    const twoHundredAndOneWords = `${twoHundredWords} palavra`;

    expect(getReadingTime(twoHundredWords)).toBe(1);
    expect(getReadingTime(twoHundredAndOneWords)).toBe(2);
  });

  it("nunca retorna menos de 1 minuto", () => {
    expect(getReadingTime("")).toBe(1);
    expect(getReadingTime("uma frase curta")).toBe(1);
  });
});

describe("selectFeatured", () => {
  const featuredNewest = makePost({ slug: "featured-newest", date: "2026-03-01", featured: true });
  const featuredOldest = makePost({ slug: "featured-oldest", date: "2026-01-01", featured: true });
  const featuredMiddle = makePost({ slug: "featured-middle", date: "2026-02-01", featured: true });
  const notFeaturedNewest = makePost({ slug: "not-featured-newest", date: "2026-04-01", featured: false });
  const notFeaturedOldest = makePost({ slug: "not-featured-oldest", date: "2025-12-01", featured: false });

  it("retorna só os destaques quando já são 3 ou mais", () => {
    const posts = [featuredNewest, featuredOldest, featuredMiddle, notFeaturedNewest];
    const result = selectFeatured(posts, 3);

    expect(result.map((post) => post.slug)).toEqual(["featured-newest", "featured-oldest", "featured-middle"]);
  });

  it("completa com os mais recentes quando há menos de 3 destaques", () => {
    const posts = [featuredOldest, notFeaturedNewest, notFeaturedOldest];
    const result = selectFeatured(posts, 3);

    expect(result.map((post) => post.slug)).toEqual(["featured-oldest", "not-featured-newest", "not-featured-oldest"]);
  });

  it("não duplica um texto que já é destaque ao completar", () => {
    const posts = [featuredNewest, notFeaturedNewest];
    const result = selectFeatured(posts, 3);

    expect(result.map((post) => post.slug)).toEqual(["featured-newest", "not-featured-newest"]);
  });
});

describe("leitura dos textos (fs isolado)", () => {
  beforeEach(() => {
    mockedReaddirSync.mockReturnValue(Object.keys(FIXTURE_POSTS));
    mockedReadFileSync.mockImplementation((filePath) => {
      const fileName = path.basename(filePath);
      const content = FIXTURE_POSTS[fileName];
      if (content === undefined) {
        throw new Error(`arquivo de teste não encontrado: ${fileName}`);
      }
      return content;
    });
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.clearAllMocks();
  });

  it("lê os textos a partir do sistema de arquivos", () => {
    vi.stubEnv("NODE_ENV", "test");
    const posts = getAllPosts();
    const slugs = posts.map((post) => post.slug);

    expect(slugs).toContain("destaque");
    expect(slugs).toContain("rascunho");
  });

  it("ordena os textos do mais recente para o mais antigo", () => {
    vi.stubEnv("NODE_ENV", "test");
    const posts = getAllPosts();
    const dates = posts.map((post) => new Date(post.date).getTime());

    expect(dates).toEqual([...dates].sort((a, b) => b - a));
  });

  it("busca um texto pelo slug", () => {
    vi.stubEnv("NODE_ENV", "test");
    const post = getPostBySlug("destaque");

    expect(post?.title).toBe("Texto de exemplo");
  });

  it("retorna undefined para um slug inexistente", () => {
    vi.stubEnv("NODE_ENV", "test");
    expect(getPostBySlug("nao-existe")).toBeUndefined();
  });

  it("exclui textos com draft: true do build de produção", () => {
    vi.stubEnv("NODE_ENV", "production");
    const posts = getPublishedPosts();

    expect(posts.every((post) => !post.draft)).toBe(true);
    expect(getPostBySlug("rascunho")).toBeUndefined();
  });

  it("mantém os textos com draft: true fora da produção", () => {
    vi.stubEnv("NODE_ENV", "test");
    const posts = getPublishedPosts();

    expect(posts.some((post) => post.draft)).toBe(true);
  });

  it("os destaques da aplicação nunca excedem 3 textos", () => {
    vi.stubEnv("NODE_ENV", "test");
    expect(getFeaturedPosts().length).toBeLessThanOrEqual(3);
  });
});
