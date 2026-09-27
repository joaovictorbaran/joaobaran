import { useState, useRef, useLayoutEffect, useEffect } from "react";

const C = {
  bg: "#000000",
  surface: "#1D1D1F",
  text: "#F5F5F7",
  text2: "#D2D2D7",
  text3: "#86868B",
  accent: "#007AFF",
  button: "#0071E3",
};

const DEVICES = {
  celular: { w: 390, h: 844 },
  desktop: { w: 1280, h: 800 },
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(q.matches);
  }, []);
  return r;
}

function Reveal({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (reduced) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    if (ref.current) io.observe(ref.current);
    return () => io.disconnect();
  }, [reduced]);
  return (
    <div
      ref={ref}
      style={{
        ...style,
        opacity: seen ? 1 : 0,
        transform: seen ? "none" : "translateY(20px)",
        transition: `opacity 600ms ${EASE} ${delay}ms, transform 600ms ${EASE} ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ---------- Diagramas ---------- */

const LINE = { stroke: C.text3, strokeOpacity: 0.55, strokeWidth: 1.5, fill: "none" };

function Node({ x, y, w, h, label, accent, muted, size = 14 }) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx={12}
        fill={accent ? C.accent : C.bg}
        fillOpacity={accent ? 0.16 : 1}
        stroke={accent ? C.accent : C.text3}
        strokeOpacity={accent ? 1 : muted ? 0.35 : 0.55}
        strokeWidth={1.5}
      />
      <text x={x + w / 2} y={y + h / 2 + size * 0.35} textAnchor="middle" fontSize={size} fontWeight={600} fill={muted ? C.text3 : C.text}>
        {label}
      </text>
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker id="jb-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={C.text3} fillOpacity="0.8" />
      </marker>
      <marker id="jb-arrow-blue" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill={C.accent} />
      </marker>
    </defs>
  );
}

function Caption({ x = 200, y, children, anchor = "middle" }) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={12.5} fill={C.text3}>
      {children}
    </text>
  );
}

function DiagCobranca() {
  const xs = [70, 122, 174, 226, 278, 330];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Paciente paga em parcelas, a plataforma acompanha cada uma até o pagamento e a clínica recebe">
      <Defs />
      <Node x={20} y={36} w={110} h={44} label="Paciente" />
      <Node x={270} y={36} w={110} h={44} label="Clínica" />
      <path d="M 75 80 L 75 150" {...LINE} markerEnd="url(#jb-arrow)" />
      <line x1={70} y1={170} x2={330} y2={170} stroke={C.text3} strokeOpacity={0.35} strokeWidth={2} />
      <line x1={70} y1={170} x2={174} y2={170} stroke={C.accent} strokeWidth={2} />
      {xs.map((x, i) => (
        <g key={x}>
          <circle cx={x} cy={170} r={12} fill={i < 3 ? C.accent : C.bg} stroke={i < 3 ? C.accent : C.text3} strokeOpacity={i < 3 ? 1 : 0.55} strokeWidth={1.5} />
          {i < 3 && <path d={`M ${x - 5} ${170} l 3.5 3.5 l 6.5 -7`} stroke="#fff" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />}
          <text x={x} y={202} textAnchor="middle" fontSize={12} fill={C.text3}>
            {i + 1}ª
          </text>
        </g>
      ))}
      <path d="M 330 150 L 330 84" {...LINE} markerEnd="url(#jb-arrow)" />
      <Caption y={254}>Cada parcela acompanhada até o pagamento</Caption>
    </svg>
  );
}

function DiagCredito() {
  const rows = ["Crédito", "Identidade", "Fraude"];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Um pedido de parcelamento passa pelo motor, que analisa crédito, identidade e fraude, e sai aprovado ou recusado">
      <Defs />
      <Node x={14} y={128} w={96} h={44} label="Pedido" />
      <path d="M 110 150 L 140 150" {...LINE} markerEnd="url(#jb-arrow)" />
      <rect x={144} y={62} width={142} height={176} rx={14} fill={C.bg} stroke={C.text3} strokeOpacity={0.55} strokeWidth={1.5} />
      <text x={215} y={92} textAnchor="middle" fontSize={14} fontWeight={600} fill={C.text}>
        Motor de crédito
      </text>
      {rows.map((r, i) => {
        const y = 130 + i * 36;
        return (
          <g key={r}>
            <circle cx={168} cy={y} r={8} fill={C.accent} />
            <path d={`M ${164} ${y} l 2.6 2.6 l 5 -5.2`} stroke="#fff" strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <text x={184} y={y + 4.5} fontSize={13} fill={C.text2}>
              {r}
            </text>
          </g>
        );
      })}
      <path d="M 286 150 C 296 150, 294 108, 302 108" {...LINE} markerEnd="url(#jb-arrow)" />
      <path d="M 286 150 C 296 150, 294 192, 302 192" {...LINE} markerEnd="url(#jb-arrow)" />
      <Node x={306} y={88} w={84} h={40} label="Aprovado" accent size={13} />
      <Node x={306} y={172} w={84} h={40} label="Recusado" muted size={13} />
      <Caption y={276}>Decidir quem pode parcelar, com segurança</Caption>
    </svg>
  );
}

function DiagIntegracoes() {
  const left = [44, 128, 212];
  const right = [44, 128, 212];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Instituições financeiras se conectam à Parcela Mais por integração direta, e clientes enterprise se conectam pela API pública">
      <Defs />
      {left.map((y, i) => (
        <g key={`b${y}`}>
          <Node x={14} y={y} w={86} h={44} label={`Banco ${"ABC"[i]}`} size={13} />
          <path d={`M 100 ${y + 22} C 122 ${y + 22}, 122 150, 142 150`} {...LINE} />
        </g>
      ))}
      <Node x={142} y={128} w={116} h={44} label="Parcela Mais" accent size={13.5} />
      {right.map((y, i) => (
        <g key={`c${y}`}>
          <path d={`M 258 150 C 278 150, 278 ${y + 22}, 296 ${y + 22}`} {...LINE} markerEnd="url(#jb-arrow)" />
          <Node x={300} y={y} w={86} h={44} label={`Cliente ${i + 1}`} size={13} />
        </g>
      ))}
      <Caption x={14} y={282} anchor="start">Integração direta</Caption>
      <Caption x={386} y={282} anchor="end">API pública</Caption>
    </svg>
  );
}

function DiagIA() {
  const fields = ["Emitente", "Data", "Valor", "Itens"];
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="Uma nota fiscal é lida por um modelo de IA, que extrai emitente, data, valor e itens como dados estruturados">
      <Defs />
      <rect x={24} y={58} width={92} height={124} rx={10} fill={C.bg} stroke={C.text3} strokeOpacity={0.55} strokeWidth={1.5} />
      {[82, 100, 118, 136, 154].map((y, i) => (
        <rect key={y} x={38} y={y} width={i % 2 ? 44 : 64} height={6} rx={3} fill={C.text3} fillOpacity={0.4} />
      ))}
      <Caption x={70} y={206}>Nota fiscal</Caption>
      <path d="M 116 120 L 164 120" {...LINE} markerEnd="url(#jb-arrow)" />
      <circle cx={200} cy={120} r={32} fill={C.accent} fillOpacity={0.16} stroke={C.accent} strokeWidth={1.5} />
      <text x={200} y={126} textAnchor="middle" fontSize={17} fontWeight={700} fill={C.text}>
        IA
      </text>
      <path d="M 232 120 L 256 120" stroke={C.accent} strokeWidth={1.5} fill="none" markerEnd="url(#jb-arrow-blue)" />
      <rect x={260} y={50} width={122} height={140} rx={12} fill={C.bg} stroke={C.accent} strokeWidth={1.5} />
      {fields.map((f, i) => {
        const y = 78 + i * 30;
        return (
          <g key={f}>
            <text x={274} y={y + 4} fontSize={12.5} fill={C.text2}>
              {f}
            </text>
            <rect x={332} y={y - 3} width={38} height={6} rx={3} fill={C.accent} fillOpacity={0.55} />
          </g>
        );
      })}
      <Caption x={321} y={214}>Dados estruturados</Caption>
      <Caption y={266}>Leitura e extração automáticas, dentro do sistema</Caption>
    </svg>
  );
}

function DiagMigracao() {
  return (
    <svg viewBox="0 0 400 300" role="img" aria-label="A operação segue no ar sem interrupção enquanto a base muda de Bubble para Xano">
      <Defs />
      <text x={20} y={42} fontSize={13} fontWeight={600} fill={C.text}>
        Operação no ar
      </text>
      <text x={380} y={42} textAnchor="end" fontSize={12.5} fill={C.text3}>
        sem downtime
      </text>
      <rect x={20} y={54} width={360} height={10} rx={5} fill={C.accent} />
      <line x1={170} y1={84} x2={170} y2={236} stroke={C.text3} strokeOpacity={0.5} strokeDasharray="4 4" />
      <line x1={232} y1={84} x2={232} y2={236} stroke={C.text3} strokeOpacity={0.5} strokeDasharray="4 4" />
      <rect x={20} y={112} width={212} height={40} rx={12} fill={C.surface} stroke={C.text3} strokeOpacity={0.35} strokeWidth={1.5} />
      <text x={36} y={137} fontSize={14} fontWeight={600} fill={C.text3}>
        Bubble
      </text>
      <rect x={170} y={178} width={210} height={40} rx={12} fill={C.accent} fillOpacity={0.16} stroke={C.accent} strokeWidth={1.5} />
      <text x={364} y={203} textAnchor="end" fontSize={14} fontWeight={600} fill={C.text}>
        Xano
      </text>
      <Caption x={201} y={256}>transição</Caption>
      <path d="M 20 280 L 378 280" {...LINE} markerEnd="url(#jb-arrow)" />
      <text x={20} y={272} fontSize={12} fill={C.text3}>
        tempo
      </text>
    </svg>
  );
}

/* ---------- Dobra ---------- */

const BLOCOS = [
  {
    t: "Plataforma de cobrança",
    p: "A clínica quer oferecer parcelamento, mas não pode virar banco para cobrar o paciente todo mês.",
    f: "Construí a plataforma que acompanha cada parcela até o pagamento, para a clínica focar no atendimento.",
    D: DiagCobranca,
  },
  {
    t: "Motor de análise de crédito",
    p: "Antes de parcelar, é preciso saber se o paciente consegue pagar e se ele é quem diz ser.",
    f: "Arquitetei o motor que analisa o crédito e ajuda a prevenir fraude.",
    D: DiagCredito,
  },
  {
    t: "Integrações com bancos e API pública",
    p: "Uma fintech depende de conversar com bancos e de deixar grandes clientes se conectarem a ela.",
    f: "Construí as integrações diretas com instituições financeiras e a API usada por clientes enterprise.",
    D: DiagIntegracoes,
  },
  {
    t: "IA dentro do produto",
    p: "Ler notas fiscais à mão é lento e sujeito a erro.",
    f: "Coloquei um modelo de IA para ler as notas e extrair os dados automaticamente, como parte do sistema.",
    D: DiagIA,
  },
  {
    t: "Trocar a base sem parar a operação",
    p: "Quando o volume de transações superou a tecnologia original, foi preciso trocá-la com tudo rodando.",
    f: "Conduzi a migração de Bubble para Xano sem downtime e sem reescrever tudo do zero.",
    D: DiagMigracao,
  },
];

const NUMEROS = [
  ["7 mil", "clínicas atendidas"],
  ["R$100 milhões", "transacionados"],
  ["40 mil", "pessoas com acesso ampliado a tratamentos"],
];

const MARCOS = [
  ["Aos 16", "Aprendi a programar na escola pública."],
  ["2021", "Desenvolvedor. Entrei para construir o primeiro produto da empresa."],
  ["2023", "Tech Lead. Assumi a evolução técnica da plataforma."],
  ["2024", "CTO. Lidero um time de 8 pessoas, com processos de desenvolvimento apoiados por IA."],
];

function Experiencia({ m }) {
  const padX = m ? 20 : 96;
  const body = { fontSize: m ? 17 : 19, lineHeight: 1.5 };

  return (
    <section id="experiencia" style={{ padding: `${m ? 72 : 120}px ${padX}px ${m ? 80 : 140}px` }}>
      <Reveal>
        <h2 style={{ fontSize: m ? 32 : 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.text, margin: 0, maxWidth: 760 }}>
          De desenvolvedor a CTO na mesma empresa.
        </h2>
        <p style={{ ...body, color: C.text2, marginTop: m ? 16 : 20, maxWidth: 640 }}>
          Sou CTO da Parcela Mais, uma fintech de saúde que ajuda clínicas de todo o Brasil a oferecer tratamentos parcelados aos pacientes.
        </p>
      </Reveal>

      <div className={m ? "flex flex-col" : "grid grid-cols-3"} style={{ gap: m ? 28 : 32, marginTop: m ? 48 : 80 }}>
        {NUMEROS.map(([n, l], i) => (
          <Reveal key={n} delay={i * 80}>
            <div style={{ fontSize: 14, color: C.text3 }}>Mais de</div>
            <div style={{ fontSize: m ? 32 : 44, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.text, marginTop: 2 }}>{n}</div>
            <div style={{ fontSize: 14, lineHeight: 1.4, color: C.text2, marginTop: 6, maxWidth: 260 }}>{l}</div>
          </Reveal>
        ))}
      </div>

      <div style={{ marginTop: m ? 72 : 128, display: "flex", flexDirection: "column", gap: m ? 64 : 112 }}>
        {BLOCOS.map(({ t, p, f, D }, i) => {
          const flip = !m && i % 2 === 1;
          return (
            <div key={t} className={m ? "flex flex-col" : "grid grid-cols-2 items-center"} style={{ gap: m ? 24 : 80 }}>
              <Reveal style={{ order: flip ? 2 : 1 }}>
                <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 600, lineHeight: 1.25, color: C.text, margin: 0 }}>{t}</h3>
                <p style={{ ...body, color: C.text3, marginTop: 12 }}>{p}</p>
                <p style={{ ...body, color: C.text, marginTop: 12 }}>{f}</p>
              </Reveal>
              <Reveal delay={m ? 0 : 120} style={{ order: flip ? 1 : 2 }}>
                <div className="rounded-3xl" style={{ background: C.surface, padding: m ? 12 : 20 }}>
                  <D />
                </div>
              </Reveal>
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: m ? 88 : 140 }}>
        <Reveal>
          <h3 style={{ fontSize: m ? 20 : 24, fontWeight: 600, color: C.text, margin: 0 }}>Trajetória</h3>
        </Reveal>
        <div
          className={m ? "flex flex-col" : "grid grid-cols-4"}
          style={{ marginTop: m ? 24 : 32, gap: m ? 28 : 32, position: "relative", paddingLeft: m ? 24 : 0, paddingTop: m ? 0 : 28 }}
        >
          <div
            style={
              m
                ? { position: "absolute", left: 5, top: 6, bottom: 6, width: 2, background: C.surface }
                : { position: "absolute", left: 0, right: 0, top: 5, height: 2, background: C.surface }
            }
          />
          {MARCOS.map(([a, b], i) => {
            const atual = i === MARCOS.length - 1;
            return (
              <Reveal key={a} delay={i * 80} style={{ position: "relative" }}>
                <span
                  style={{
                    position: "absolute",
                    left: m ? -24 : 0,
                    top: m ? 5 : -28,
                    width: 12,
                    height: 12,
                    borderRadius: 999,
                    background: atual ? C.accent : C.bg,
                    border: `2px solid ${atual ? C.accent : C.text3}`,
                  }}
                />
                <div style={{ fontSize: 17, fontWeight: 600, color: C.text }}>{a}</div>
                <div style={{ fontSize: 15, lineHeight: 1.45, color: C.text2, marginTop: 6, maxWidth: 260 }}>{b}</div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal style={{ marginTop: m ? 88 : 140, maxWidth: 820 }}>
        <p style={{ fontSize: m ? 24 : 32, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.3, color: C.text, margin: 0 }}>
          Em todos esses sistemas, o código foi a parte mais fácil. O difícil foi entender o problema certo.
        </p>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="jb-btn2 inline-block rounded-full font-semibold"
          style={{ marginTop: m ? 28 : 36, fontSize: 17, padding: m ? "12px 22px" : "13px 26px", textDecoration: "none" }}
        >
          Ver CV
        </a>
      </Reveal>
    </section>
  );
}

function Device({ device, children }) {
  const outer = useRef(null);
  const [scale, setScale] = useState(1);
  const { w, h } = DEVICES[device];
  useLayoutEffect(() => {
    const update = () => outer.current && setScale(Math.min(1, outer.current.clientWidth / w));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer.current);
    return () => ro.disconnect();
  }, [w]);
  return (
    <div ref={outer} className="w-full">
      <div style={{ width: w * scale, height: h * scale, margin: "0 auto", borderRadius: device === "celular" ? 36 : 14, overflow: "hidden", border: "1px solid #2c2c2e" }}>
        <div className="jb-scroll" style={{ width: w, height: h, transform: `scale(${scale})`, transformOrigin: "top left", overflowY: "auto", background: C.bg }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Toggle({ options, value, onChange }) {
  return (
    <div className="flex rounded-full" style={{ background: C.surface, padding: 3 }}>
      {options.map(([k, label]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className="rounded-full"
          style={{ fontSize: 13, padding: "6px 12px", background: value === k ? "#3a3a3c" : "transparent", color: value === k ? C.text : C.text3 }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function DobraExperiencia() {
  const [device, setDevice] = useState("celular");
  const m = device === "celular";
  return (
    <div className="min-h-screen" style={{ background: "#111113", color: C.text, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        svg { width: 100%; height: auto; display: block; font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif; }
        .jb-btn2 { color: ${C.text}; border: 1px solid ${C.text3}; transition: border-color 200ms ease, transform 200ms ease; }
        .jb-btn2:hover { border-color: ${C.text}; }
        .jb-btn2:active { transform: scale(0.98); }
        .jb-btn2:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 3px; }
        .jb-scroll::-webkit-scrollbar { display: none; }
      `}</style>
      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div className="font-semibold" style={{ fontSize: 17 }}>Dobra 2: Experiência</div>
          <div style={{ fontSize: 13, color: C.text3, marginTop: 2 }}>Alta fidelidade. Role dentro da tela: cada parte aparece uma vez ao entrar na tela.</div>
        </div>
        <div className="flex flex-wrap items-center" style={{ gap: 10, marginBottom: 16 }}>
          <Toggle options={[["celular", "Celular"], ["desktop", "Desktop"]]} value={device} onChange={setDevice} />
        </div>
        <Device device={device}>
          <Experiencia key={device} m={m} />
        </Device>
      </div>
    </div>
  );
}
