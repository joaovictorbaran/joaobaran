import Image from "next/image";
import { aparicoes } from "@/content/site";
import { Reveal } from "./reveal";

function PlayIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path
        d="M6.5 4.8v10.4a.8.8 0 0 0 1.22.68l8.3-5.2a.8.8 0 0 0 0-1.36l-8.3-5.2A.8.8 0 0 0 6.5 4.8Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Aparicoes() {
  return (
    <section id="aparicoes" className="jb-aparicoes">
      <div className="jb-container">
        <Reveal>
          <h2 className="text-section text-text">{aparicoes.title}</h2>
        </Reveal>

        <div className="jb-aparicoes__list">
          {aparicoes.items.map((item, index) => (
            <Reveal key={item.href} delay={index * 80}>
              <a className="jb-aparicoes__card" href={item.href} target="_blank" rel="noopener noreferrer">
                <span className="jb-aparicoes__media">
                  <Image
                    className="jb-aparicoes__image"
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 1040px, 100vw"
                  />
                  <span className="jb-aparicoes__play" aria-hidden="true">
                    <PlayIcon />
                  </span>
                </span>
                <span className="jb-aparicoes__title text-subtitle text-text">{item.title}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
