"use client";

import { useEffect, useId, useRef, useState, useSyncExternalStore } from "react";

const MOBILE_QUERY = "(max-width: 767px)";
const DESKTOP_KEY_POINTS = "0.50;0.86;0.50";
const MOBILE_KEY_POINTS = "0.74;0.90;0.74";
const DURATION_S = 18;

function subscribeToMobileQuery(callback: () => void) {
  const mql = window.matchMedia(MOBILE_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getMobileQuerySnapshot() {
  return window.matchMedia(MOBILE_QUERY).matches;
}

function getMobileQueryServerSnapshot() {
  return false;
}

function useIsMobile() {
  return useSyncExternalStore(subscribeToMobileQuery, getMobileQuerySnapshot, getMobileQueryServerSnapshot);
}

/**
 * Fundo animado do hero (BAR-25, identidade "Construindo o Futuro"): o horizonte com um
 * foco de luz que faz uma deriva lenta ao longo de um arco. Documentado em
 * docs/decisions/002-animated-hero-background.md, com a excessão à regra "cada animação
 * roda uma vez" e os limites de acessibilidade abaixo.
 *
 * A animação roda igual para todos, sem controle de pausa e sem tratamento de
 * `prefers-reduced-motion`. A única pausa é por desempenho: quando o hero sai da tela
 * (`IntersectionObserver`).
 */
export function HorizonLayer() {
  const gradientHaloId = useId();
  const gradientStreakId = useId();
  const arcId = useId();

  const svgRef = useRef<SVGSVGElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => setIsVisible(entry.isIntersecting), {
      threshold: 0,
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    if (isVisible) {
      svg.unpauseAnimations();
    } else {
      svg.pauseAnimations();
    }
  }, [isVisible]);

  const keyPoints = isMobile ? MOBILE_KEY_POINTS : DESKTOP_KEY_POINTS;
  const preserveAspectRatio = isMobile ? "xMaxYMid slice" : "xMidYMid slice";

  return (
    <>
      <div ref={wrapperRef} className="jb-hero__horizon" aria-hidden="true" data-paused={!isVisible}>
        <svg ref={svgRef} viewBox="0 0 1983 793" preserveAspectRatio={preserveAspectRatio}>
          <defs>
            <radialGradient id={gradientHaloId}>
              <stop offset="0%" stopColor="#00C2FF" stopOpacity={0.75} />
              <stop offset="40%" stopColor="#007AFF" stopOpacity={0.32} />
              <stop offset="100%" stopColor="#0B3DFF" stopOpacity={0} />
            </radialGradient>
            <radialGradient id={gradientStreakId}>
              <stop offset="0%" stopColor="#F2FBFF" stopOpacity={1} />
              <stop offset="35%" stopColor="#7FDBFF" stopOpacity={0.75} />
              <stop offset="100%" stopColor="#00C2FF" stopOpacity={0} />
            </radialGradient>
            {/* Arco medido na imagem original: círculo de raio 3617px, erro máximo de 3px.
                Se a imagem for recortada ou trocada, medir o arco de novo. */}
            <path id={arcId} d="M 200 827.8 A 3617 3617 0 0 1 2100 291" />
          </defs>
          <image href="/images/horizon.jpg" width={1983} height={793} preserveAspectRatio="none" />
          <g style={{ mixBlendMode: "screen" }}>
            <ellipse cx={0} cy={-45} rx={640} ry={180} fill={`url(#${gradientHaloId})`} />
            <ellipse cx={0} cy={0} rx={380} ry={18} fill={`url(#${gradientStreakId})`} />
            <ellipse cx={0} cy={0} rx={150} ry={7} fill={`url(#${gradientStreakId})`} />
            <animateMotion
              dur={`${DURATION_S}s`}
              repeatCount="indefinite"
              rotate="auto"
              keyPoints={keyPoints}
              keyTimes="0;0.5;1"
              calcMode="spline"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            >
              <mpath href={`#${arcId}`} />
            </animateMotion>
            <animate
              attributeName="opacity"
              values="0.75;1;0.75"
              dur="6s"
              repeatCount="indefinite"
              calcMode="spline"
              keyTimes="0;0.5;1"
              keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
            />
          </g>
        </svg>
      </div>

      <div className="jb-hero__shadow" aria-hidden="true" />
    </>
  );
}
