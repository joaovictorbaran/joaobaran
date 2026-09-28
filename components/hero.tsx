"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
import { Cursor } from "./cursor";
import { hero } from "@/content/site";

const TITLE = hero.title;
const START_MS = 300;
const CHAR_MS = 45;
const SESSION_KEY = "jb-hero-typed";

function readSessionPlayed() {
  try {
    return sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionPlayed() {
  try {
    sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    // Sessão sem armazenamento disponível: a digitação roda de novo na próxima carga.
  }
}

export function Hero() {
  const reducedMotion = useReducedMotion();
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (reducedMotion || readSessionPlayed()) {
      const timer = setTimeout(() => {
        setShown(TITLE.length);
        setDone(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    for (let i = 1; i <= TITLE.length; i += 1) {
      timers.push(setTimeout(() => setShown(i), START_MS + i * CHAR_MS));
    }
    timers.push(
      setTimeout(
        () => {
          setDone(true);
          markSessionPlayed();
        },
        START_MS + TITLE.length * CHAR_MS,
      ),
    );

    return () => timers.forEach(clearTimeout);
  }, [reducedMotion]);

  const chars = [...TITLE];

  return (
    <section className="jb-hero">
      <div className="jb-hero__inner jb-container">
        <h1 className="jb-hero__title text-display text-text" aria-label={TITLE}>
          <span aria-hidden="true">
            {chars.map((char, index) => (
              <span key={index} className="jb-hero__char">
                {/* Posicionado como position:absolute (jb-cursor--roving) para não entrar no
                    fluxo do texto: entrando/saindo a cada letra, ele perturbava exatamente onde
                    o título quebra de linha e causava CLS (Spec §10, "CLS zero no hero"). */}
                {index === shown && !done ? <Cursor className="jb-cursor--roving" /> : null}
                <span className="jb-hero__letter" data-revealed={index < shown}>
                  {char}
                </span>
              </span>
            ))}
            {done || shown === chars.length ? <Cursor /> : null}
          </span>
        </h1>

        <p className="jb-hero__support text-support text-text-2" data-visible={done}>
          {hero.support}
        </p>

        <div className="jb-hero__cta" data-visible={done}>
          <a className="jb-btn" href="#contato">
            {hero.cta}
          </a>
        </div>
      </div>
    </section>
  );
}
