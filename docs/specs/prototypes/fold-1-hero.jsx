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

const TITLE = "Construindo o futuro.";
const CHAR_MS = 45;
const START_MS = 300;

function usePrefersReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(prefers-reduced-motion: reduce)");
    setR(q.matches);
    const f = (e) => setR(e.matches);
    q.addEventListener?.("change", f);
    return () => q.removeEventListener?.("change", f);
  }, []);
  return r;
}

function Hero({ m, runKey, cursorMode, reduced }) {
  const [shown, setShown] = useState(reduced ? TITLE.length : 0);
  const [phase, setPhase] = useState(reduced ? "done" : "typing");
  const [cursorOn, setCursorOn] = useState(!reduced);

  useEffect(() => {
    if (reduced) {
      setShown(TITLE.length);
      setPhase("done");
      setCursorOn(false);
      return;
    }
    setShown(0);
    setPhase("typing");
    setCursorOn(true);
    const timers = [];
    for (let i = 1; i <= TITLE.length; i++) {
      timers.push(setTimeout(() => setShown(i), START_MS + i * CHAR_MS));
    }
    const end = START_MS + TITLE.length * CHAR_MS;
    timers.push(setTimeout(() => setPhase("done"), end));
    if (cursorMode === "some") timers.push(setTimeout(() => setCursorOn(false), end + 3000));
    return () => timers.forEach(clearTimeout);
  }, [runKey, cursorMode, reduced]);

  const done = phase === "done";
  const reveal = (delay) => ({
    opacity: done ? 1 : 0,
    transform: done ? "translateY(0)" : "translateY(12px)",
    transition: reduced ? "none" : `opacity 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 500ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
  });

  const size = m ? 44 : 80;
  const chars = TITLE.split("");
  const cw = m ? 4 : 6;
  const gap = m ? 3 : 5;
  const cursor = (
    <span
      className={done ? "jb-blink" : ""}
      style={{
        display: "inline-block",
        width: cw,
        height: "0.82em",
        marginLeft: gap,
        marginRight: -(cw + gap),
        background: C.accent,
        verticalAlign: "-0.06em",
        opacity: cursorOn ? 1 : 0,
        transition: "opacity 400ms ease",
      }}
    />
  );

  return (
    <div
      className="flex flex-col justify-center"
      style={{ minHeight: m ? 844 - 52 - 72 : 800 - 60 - 64, padding: m ? "0 20px" : "0 96px" }}
    >
      <h1
        aria-label={TITLE}
        style={{ fontSize: size, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05, color: C.text, margin: 0, maxWidth: m ? "100%" : 1000 }}
      >
        <span aria-hidden="true">
          {chars.map((ch, i) => (
            <span key={i}>
              {i === shown ? cursor : null}
              <span style={{ opacity: i < shown ? 1 : 0 }}>{ch}</span>
            </span>
          ))}
          {shown === chars.length ? cursor : null}
        </span>
      </h1>

      <p style={{ ...reveal(150), fontSize: m ? 17 : 21, lineHeight: 1.5, color: C.text2, marginTop: m ? 20 : 28, maxWidth: m ? 330 : 620 }}>
        Engenheiro de software. Transformo problemas de negócio em produtos.
      </p>

      <div style={{ ...reveal(280), marginTop: m ? 32 : 40 }}>
        <a
          href="#contato"
          onClick={(e) => e.preventDefault()}
          className="jb-btn inline-block rounded-full font-semibold"
          style={{ background: C.button, color: "#FFFFFF", fontSize: 17, padding: m ? "13px 24px" : "14px 28px", textDecoration: "none" }}
        >
          Entrar em contato
        </a>
      </div>
    </div>
  );
}

function Menu({ m }) {
  return (
    <nav
      className="flex items-center justify-between"
      style={{ height: m ? 52 : 60, padding: m ? "0 20px" : "0 96px", borderBottom: `1px solid ${C.surface}` }}
    >
      <a href="#" onClick={(e) => e.preventDefault()} className="font-semibold" style={{ color: C.text, fontSize: m ? 15 : 16, textDecoration: "none" }}>
        João Baran
      </a>
      <div className="flex" style={{ gap: m ? 16 : 32 }}>
        {["Experiência", "Textos", "Contato"].map((l) => (
          <a key={l} href="#" onClick={(e) => e.preventDefault()} className="jb-link" style={{ fontSize: 14, textDecoration: "none" }}>
            {l}
          </a>
        ))}
      </div>
    </nav>
  );
}

function Peek({ m }) {
  return (
    <div style={{ padding: m ? "0 20px 80px" : "0 96px 120px" }}>
      <h2 style={{ fontSize: m ? 32 : 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1, color: C.text, margin: 0, maxWidth: 760 }}>
        De desenvolvedor a CTO na mesma empresa.
      </h2>
      <p style={{ fontSize: m ? 17 : 19, lineHeight: 1.5, color: C.text2, marginTop: 16, maxWidth: 640 }}>
        Aqui começa a dobra de Experiência. Ela entra no próximo protótipo.
      </p>
    </div>
  );
}

function Device({ device, children }) {
  const outer = useRef(null);
  const [scale, setScale] = useState(1);
  const { w, h } = DEVICES[device];

  useLayoutEffect(() => {
    const update = () => {
      if (!outer.current) return;
      setScale(Math.min(1, outer.current.clientWidth / w));
    };
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

export default function DobraAbertura() {
  const [device, setDevice] = useState("celular");
  const [cursorMode, setCursorMode] = useState("fica");
  const [runKey, setRunKey] = useState(0);
  const reduced = usePrefersReducedMotion();
  const m = device === "celular";

  return (
    <div className="min-h-screen" style={{ background: "#111113", color: C.text, fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @keyframes jbBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .jb-blink { animation: jbBlink 1.05s steps(1) infinite; }
        .jb-link { color: ${C.text2}; transition: color 200ms ease; }
        .jb-link:hover { color: ${C.text}; }
        .jb-btn { transition: background-color 200ms ease, transform 200ms ease; }
        .jb-btn:hover { background-color: #0077ED !important; }
        .jb-btn:active { transform: scale(0.98); }
        .jb-btn:focus-visible, .jb-link:focus-visible { outline: 2px solid ${C.accent}; outline-offset: 3px; }
        .jb-scroll::-webkit-scrollbar { display: none; }
        @media (prefers-reduced-motion: reduce) { .jb-blink { animation: none; } }
      `}</style>

      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div className="font-semibold" style={{ fontSize: 17 }}>Dobra 1: Menu e Abertura</div>
          <div style={{ fontSize: 13, color: C.text3, marginTop: 2 }}>
            Alta fidelidade. A tela simula o aparelho: role dentro dela para ver o início da próxima dobra.
          </div>
        </div>

        <div className="flex flex-wrap items-center" style={{ gap: 10, marginBottom: 16 }}>
          <Toggle options={[["celular", "Celular"], ["desktop", "Desktop"]]} value={device} onChange={setDevice} />
          <Toggle options={[["fica", "Cursor fica"], ["some", "Cursor some"]]} value={cursorMode} onChange={(v) => { setCursorMode(v); setRunKey((k) => k + 1); }} />
          <button
            onClick={() => setRunKey((k) => k + 1)}
            className="rounded-full font-semibold"
            style={{ fontSize: 13, padding: "8px 14px", background: C.surface, color: C.text }}
          >
            Reproduzir digitação
          </button>
        </div>

        <Device device={device}>
          <Menu m={m} />
          <Hero key={`${device}-${runKey}`} m={m} runKey={runKey} cursorMode={cursorMode} reduced={reduced} />
          <Peek m={m} />
        </Device>
      </div>
    </div>
  );
}
