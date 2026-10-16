import Image from "next/image";
import type { Post } from "@/lib/posts";

type PostCardCoverProps = {
  post: Pick<Post, "cover">;
  sizes: string;
};

/**
 * Área de capa no topo de um card de texto. Sem `cover`, mantém a mesma altura,
 * preenchida com a cor de superfície, sem ícone nem texto.
 */
export function PostCardCover({ post, sizes }: PostCardCoverProps) {
  return (
    <div className="jb-post-cover">
      {post.cover ? (
        // alt vazio: dentro do card, o título do link já descreve o texto.
        <Image src={post.cover} alt="" fill sizes={sizes} className="jb-post-cover__image" />
      ) : null}
    </div>
  );
}
