export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON-LD é o uso documentado do Next.js para dados estruturados: o conteúdo
      // vem de dentro do próprio código (nunca de entrada do usuário).
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
