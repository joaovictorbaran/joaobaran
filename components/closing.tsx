import Image from "next/image";
import sphere from "@/assets/brand/icon.png";
import { closing } from "@/content/site";
import { Cursor } from "./cursor";
import { Reveal } from "./reveal";

/**
 * Dobra azul (BAR-76): a esfera do favicon é o arquivo real `assets/brand/icon.png`,
 * ampliado a 119,5% (a issue pede ~117,5%; o ajuste vem da medição do arquivo) dentro de um círculo recortado para a esfera (85% da largura da
 * imagem) preencher o círculo, sem o quadrado preto em volta.
 */
export function Closing() {
  return (
    <section className="jb-closing" aria-labelledby="closing-title">
      <div className="jb-closing__halo" aria-hidden="true" />
      <div className="jb-closing__stage">
        <div className="jb-closing__sphere" aria-hidden="true">
          <Image
            className="jb-closing__image"
            src={sphere}
            alt=""
            sizes="(min-width: 768px) 670px, 311px"
          />
        </div>

        <Reveal className="jb-closing__content">
          <h2 id="closing-title" className="jb-closing__title">
            {closing.lines.map((line, index) => (
              <span key={line} className="jb-closing__line">
                {line}
                {index === closing.lines.length - 1 ? <Cursor className="jb-closing__cursor" /> : null}
              </span>
            ))}
          </h2>
          <a className="jb-closing__cta" href={closing.href} target="_blank" rel="noopener noreferrer">
            {closing.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
