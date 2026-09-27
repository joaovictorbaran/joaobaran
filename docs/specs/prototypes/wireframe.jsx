import { useState, useRef, useLayoutEffect } from "react";

const WIDTHS = { celular: 390, desktop: 1280 };
const BLUE = "#007AFF";

const T = {
  display: (m) => ({ fontSize: m ? 44 : 80, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.05 }),
  h2: (m) => ({ fontSize: m ? 32 : 48, fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.1 }),
  h3: (m) => ({ fontSize: m ? 20 : 24, fontWeight: 600, lineHeight: 1.25 }),
  body: (m) => ({ fontSize: m ? 17 : 19, lineHeight: 1.5 }),
  small: () => ({ fontSize: 14, lineHeight: 1.4 }),
};

function Bar({ w = "100%", h = 10, className = "" }) {
  return <div className={`rounded bg-neutral-800 ${className}`} style={{ width: w, height: h }} />;
}

function Box({ label, className = "", style = {} }) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl border border-dashed border-neutral-700 text-center text-neutral-500 ${className}`}
      style={{ fontSize: 13, padding: 12, ...style }}
    >
      {label}
    </div>
  );
}

function Btn({ children, primary, onClick }) {
  return (
    <button
      onClick={onClick}
      className="rounded-full font-semibold"
      style={{
        fontSize: 15,
        padding: "12px 22px",
        background: primary ? "#3a3a3c" : "transparent",
        color: "#f5f5f7",
        border: primary ? "none" : "1px solid #3a3a3c",
      }}
    >
      {children}
    </button>
  );
}

function Fold({ n, name, note, show, m, children, pad = true }) {
  return (
    <section className="border-t border-dashed border-neutral-800">
      {show && (
        <div style={{ background: "#0a1a33", borderBottom: "1px solid #12315e", color: "#8ab8ff", fontSize: 12, padding: "8px 16px", lineHeight: 1.45 }}>
          <strong>
            {n}. {name}
          </strong>
          <span style={{ opacity: 0.85 }}> {note}</span>
        </div>
      )}
      <div style={pad ? { padding: m ? "56px 20px" : "96px 96px" } : {}}>{children}</div>
    </section>
  );
}

function Menu({ m, go }) {
  return (
    <div className="flex items-center justify-between border-b border-neutral-900" style={{ padding: m ? "14px 20px" : "18px 96px" }}>
      <button onClick={() => go("home")} className="font-semibold text-neutral-100" style={{ fontSize: m ? 15 : 16 }}>
        João Baran
      </button>
      <div className="flex text-neutral-400" style={{ gap: m ? 14 : 28, fontSize: 14 }}>
        <span>Experiência</span>
        <button onClick={() => go("lista")}>Textos</button>
        <span>Contato</span>
      </div>
    </div>
  );
}

function Footer({ m, show }) {
  return (
    <Fold n="R" name="Rodapé" show={show} m={m} note="Mínimo: e-mail, CV e ano. Sem ícones de redes, que já estão em Canais." pad={false}>
      <div className="flex flex-wrap items-center justify-between text-neutral-500" style={{ padding: m ? "24px 20px" : "28px 96px", gap: 12, ...T.small() }}>
        <span>email@joaobaran.com</span>
        <span>CV</span>
        <span>2026</span>
      </div>
    </Fold>
  );
}

function Home({ m, show, go }) {
  const blocos = [
    ["Plataforma de cobrança", "Clínicas precisavam receber de pacientes que pagam em parcelas."],
    ["Motor de análise de crédito", "Decidir quem pode parcelar, com segurança e prevenção a fraude."],
    ["Integrações com bancos e API pública", "Conectar a empresa ao sistema financeiro e a clientes grandes."],
    ["IA dentro do produto", "Ler e extrair dados de notas fiscais com LLM."],
    ["Troca de infraestrutura sem parar a operação", "Migração de Bubble para Xano, sem downtime, quando o volume superou a stack original."],
  ];
  const marcos = [
    ["Aos 16", "Começa a programar"],
    ["2021", "Desenvolvedor"],
    ["2023", "Tech Lead"],
    ["2024", "CTO, time de 8 pessoas"],
  ];
  const canais = [
    ["LinkedIn", "Trajetória e bastidores de carreira"],
    ["GitHub", "Código e projetos"],
    ["YouTube", "Vídeos"],
    ["X", "Construção em público"],
  ];

  return (
    <>
      <Fold n="0" name="Menu" show={show} m={m} pad={false} note="Nome em texto à esquerda. Três âncoras, sem menu hambúrguer: com três itens, cabem até no celular.">
        <Menu m={m} go={go} />
      </Fold>

      <Fold n="1" name="Abertura" show={show} m={m} note="Ocupa a tela inteira. Título com digitação e cursor azul (experimento). Sem imagem, sem números, um botão só.">
        <div className="flex flex-col justify-center" style={{ minHeight: m ? 560 : 620 }}>
          <h1 className="text-neutral-100" style={T.display(m)}>
            Construindo o futuro.
            <span className="jb-cursor" style={{ display: "inline-block", width: m ? 4 : 6, height: "0.85em", background: BLUE, marginLeft: 6, verticalAlign: "-0.08em" }} />
          </h1>
          <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 20, maxWidth: 560 }}>
            Engenheiro de software. Transformo problemas de negócio em produtos.
          </p>
          <div style={{ marginTop: 32 }}>
            <Btn primary>Entrar em contato</Btn>
          </div>
        </div>
      </Fold>

      <Fold n="2" name="Experiência" show={show} m={m} note="A seção mais longa. Organizada pelo que foi construído, não por cargo. Textos provisórios: o texto final nasce com o protótipo desta dobra.">
        <h2 className="text-neutral-100" style={{ ...T.h2(m), maxWidth: 760 }}>
          De desenvolvedor a CTO na mesma empresa.
        </h2>
        <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 16, maxWidth: 640 }}>
          Na Parcela Mais, construí a tecnologia de uma fintech de saúde que ajuda clínicas de todo o Brasil a oferecer tratamentos parcelados.
        </p>

        <div className={m ? "flex flex-col" : "grid grid-cols-3"} style={{ gap: m ? 28 : 32, marginTop: m ? 40 : 64 }}>
          {[
            ["Mais de 7 mil", "clínicas"],
            ["Mais de R$100 milhões", "transacionados"],
            ["Mais de 40 mil", "pessoas com acesso a tratamento"],
          ].map(([a, b]) => (
            <div key={a}>
              <div className="text-neutral-100" style={T.h3(m)}>{a}</div>
              <div className="text-neutral-500" style={T.small()}>{b}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: m ? 56 : 96, display: "flex", flexDirection: "column", gap: m ? 48 : 80 }}>
          {blocos.map(([t, d], i) => (
            <div key={t} className={m ? "flex flex-col" : "grid grid-cols-2 items-center"} style={{ gap: m ? 20 : 64 }}>
              <div style={{ order: !m && i % 2 === 1 ? 2 : 1 }}>
                <h3 className="text-neutral-100" style={T.h3(m)}>{t}</h3>
                <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 10 }}>{d}</p>
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                  <Bar w="92%" />
                  <Bar w="70%" />
                </div>
              </div>
              <Box label="Visual do bloco (a definir: tela, diagrama ou ilustração)" style={{ order: !m && i % 2 === 1 ? 1 : 2, aspectRatio: "4 / 3" }} />
            </div>
          ))}
        </div>

        <div style={{ marginTop: m ? 64 : 112 }}>
          <h3 className="text-neutral-100" style={T.h3(m)}>Trajetória</h3>
          <div className={m ? "flex flex-col" : "grid grid-cols-4"} style={{ gap: m ? 20 : 24, marginTop: 24, borderLeft: m ? "1px solid #3a3a3c" : "none", borderTop: m ? "none" : "1px solid #3a3a3c", paddingLeft: m ? 18 : 0, paddingTop: m ? 0 : 20 }}>
            {marcos.map(([a, b]) => (
              <div key={a}>
                <div className="text-neutral-100 font-semibold" style={{ fontSize: 17 }}>{a}</div>
                <div className="text-neutral-500" style={T.small()}>{b}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: m ? 64 : 112, maxWidth: 720 }}>
          <Box label="Fechamento: a ideia de que tecnologia sozinha não resolve nada, contada como prática" style={{ minHeight: 96 }} />
          <div style={{ marginTop: 28 }}>
            <Btn>Ver CV</Btn>
          </div>
        </div>
      </Fold>

      <Fold n="3" name="Textos" show={show} m={m} note="Os 3 textos mais fortes (curadoria, não os mais recentes) e o podcast como aparição. O link leva para /textos.">
        <h2 className="text-neutral-100" style={T.h2(m)}>Textos</h2>
        <div className={m ? "flex flex-col" : "grid grid-cols-3"} style={{ gap: 20, marginTop: m ? 32 : 48 }}>
          {[1, 2, 3].map((i) => (
            <button key={i} onClick={() => go("texto")} className="rounded-2xl text-left" style={{ background: "#1d1d1f", padding: 24 }}>
              <div className="text-neutral-100" style={T.h3(m)}>Título do texto {i}</div>
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <Bar w="95%" />
                <Bar w="60%" />
              </div>
              <div className="text-neutral-500" style={{ ...T.small(), marginTop: 16 }}>Data</div>
            </button>
          ))}
        </div>
        <div className="rounded-2xl" style={{ border: "1px solid #2c2c2e", padding: 24, marginTop: 20 }}>
          <div className="text-neutral-500" style={T.small()}>Aparição</div>
          <div className="text-neutral-100" style={{ ...T.h3(m), marginTop: 6 }}>Podcast Sem Codar, com Renato Asse</div>
        </div>
        <div style={{ marginTop: 28 }}>
          <Btn onClick={() => go("lista")}>Ver todos os textos</Btn>
        </div>
      </Fold>

      <Fold n="4" name="Canais" show={show} m={m} note="LinkedIn, GitHub, YouTube e X, nessa ordem. Nome, uma linha do que faz ali, link. Instagram entra quando o perfil for definido.">
        <h2 className="text-neutral-100" style={T.h2(m)}>Canais</h2>
        <div style={{ marginTop: m ? 28 : 40 }}>
          {canais.map(([a, b]) => (
            <div key={a} className={m ? "flex flex-col" : "flex items-center justify-between"} style={{ borderTop: "1px solid #2c2c2e", padding: "20px 0", gap: 4 }}>
              <span className="text-neutral-100 font-semibold" style={{ fontSize: m ? 17 : 19 }}>{a}</span>
              <span className="text-neutral-400" style={T.small()}>{b}</span>
            </div>
          ))}
        </div>
      </Fold>

      <Fold n="5" name="Contato" show={show} m={m} note="Destino do botão do hero e do menu. Foto de braços cruzados em cartão arredondado. E-mail visível com botão de copiar, LinkedIn como alternativa.">
        <div className={m ? "flex flex-col" : "grid grid-cols-2 items-center"} style={{ gap: m ? 28 : 72 }}>
          <Box label="Foto (braços cruzados)" style={{ aspectRatio: "4 / 5", maxWidth: m ? "100%" : 420 }} />
          <div>
            <h2 className="text-neutral-100" style={T.h2(m)}>Título do contato</h2>
            <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 14 }}>Uma linha convidando a conversar.</p>
            <div className="rounded-2xl flex items-center justify-between" style={{ background: "#1d1d1f", padding: "16px 20px", marginTop: 28, gap: 12 }}>
              <span className="text-neutral-100" style={{ fontSize: 16 }}>email@joaobaran.com</span>
              <Btn primary>Copiar e-mail</Btn>
            </div>
            <div style={{ marginTop: 16 }}>
              <Btn>Falar no LinkedIn</Btn>
            </div>
          </div>
        </div>
      </Fold>

      <Footer m={m} show={show} />
    </>
  );
}

function Lista({ m, show, go }) {
  return (
    <>
      <Menu m={m} go={go} />
      <Fold n="L" name="/textos" show={show} m={m} note="Lista cronológica de todos os textos importados. Título, data e uma linha de resumo. Sem imagens de capa na fase 1.">
        <h1 className="text-neutral-100" style={T.h2(m)}>Textos</h1>
        <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 12, maxWidth: 560 }}>Uma linha sobre o que você escreve.</p>
        <div style={{ marginTop: m ? 32 : 48, maxWidth: 760 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <button key={i} onClick={() => go("texto")} className="block w-full text-left" style={{ borderTop: "1px solid #2c2c2e", padding: "22px 0" }}>
              <div className="text-neutral-500" style={T.small()}>Data</div>
              <div className="text-neutral-100" style={{ ...T.h3(m), marginTop: 4 }}>Título do texto {i}</div>
              <div style={{ marginTop: 10 }}>
                <Bar w="80%" />
              </div>
            </button>
          ))}
        </div>
      </Fold>
      <Footer m={m} show={show} />
    </>
  );
}

function Texto({ m, show, go }) {
  return (
    <>
      <Menu m={m} go={go} />
      <Fold n="P" name="/textos/[slug]" show={show} m={m} note="Onde o visitante passa mais tempo. Fundo Space Gray, coluna de ~680px, texto em #F5F5F7. No fim, convite para o contato e para outros textos.">
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <button onClick={() => go("lista")} className="text-neutral-500" style={T.small()}>Textos</button>
          <h1 className="text-neutral-100" style={{ ...T.h2(m), marginTop: 12 }}>Título do texto</h1>
          <div className="text-neutral-500" style={{ ...T.small(), marginTop: 14 }}>Data e tempo de leitura</div>
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 10 }}>
            {[100, 96, 98, 72, 0, 100, 94, 97, 88, 60, 0, 99, 95, 80].map((w, i) =>
              w === 0 ? <div key={i} style={{ height: 16 }} /> : <Bar key={i} w={`${w}%`} h={12} />
            )}
          </div>
          <div className="rounded-2xl" style={{ background: "#1d1d1f", padding: 24, marginTop: 56 }}>
            <div className="text-neutral-100" style={T.h3(m)}>Convite ao final do texto</div>
            <div className="text-neutral-400" style={{ ...T.small(), marginTop: 6 }}>Entrar em contato ou ler outro texto</div>
          </div>
        </div>
      </Fold>
      <Footer m={m} show={show} />
    </>
  );
}

function NaoEncontrada({ m, show, go }) {
  return (
    <>
      <Menu m={m} go={go} />
      <Fold n="404" name="Página não encontrada" show={show} m={m} note="Diz o que aconteceu e oferece um caminho. Mesmo tom do site.">
        <div className="flex flex-col justify-center" style={{ minHeight: 420 }}>
          <h1 className="text-neutral-100" style={T.h2(m)}>Esta página não existe.</h1>
          <p className="text-neutral-400" style={{ ...T.body(m), marginTop: 12 }}>Talvez o link esteja errado ou o texto tenha mudado de lugar.</p>
          <div style={{ marginTop: 28 }}>
            <Btn primary onClick={() => go("home")}>Voltar para o início</Btn>
          </div>
        </div>
      </Fold>
      <Footer m={m} show={show} />
    </>
  );
}

function Frame({ width, children }) {
  const outer = useRef(null);
  const inner = useRef(null);
  const [scale, setScale] = useState(1);
  const [h, setH] = useState(0);

  useLayoutEffect(() => {
    const update = () => {
      if (!outer.current || !inner.current) return;
      const s = Math.min(1, outer.current.clientWidth / width);
      setScale(s);
      setH(inner.current.scrollHeight * s);
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(outer.current);
    ro.observe(inner.current);
    return () => ro.disconnect();
  }, [width]);

  return (
    <div ref={outer} className="w-full">
      <div style={{ height: h, width: width * scale, margin: "0 auto", overflow: "hidden", borderRadius: 16, border: "1px solid #2c2c2e" }}>
        <div ref={inner} style={{ width, transform: `scale(${scale})`, transformOrigin: "top left", background: "#000" }}>
          {children}
        </div>
      </div>
    </div>
  );
}

function Toggle({ options, value, onChange }) {
  return (
    <div className="flex rounded-full" style={{ background: "#1d1d1f", padding: 3 }}>
      {options.map(([k, label]) => (
        <button
          key={k}
          onClick={() => onChange(k)}
          className="rounded-full"
          style={{ fontSize: 13, padding: "6px 12px", background: value === k ? "#3a3a3c" : "transparent", color: value === k ? "#f5f5f7" : "#86868b" }}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

export default function Esqueleto() {
  const [page, setPage] = useState("home");
  const [vp, setVp] = useState("celular");
  const [show, setShow] = useState(true);
  const m = vp === "celular";
  const go = (p) => setPage(p);

  const pages = { home: Home, lista: Lista, texto: Texto, "404": NaoEncontrada };
  const Page = pages[page];

  return (
    <div className="min-h-screen" style={{ background: "#111113", color: "#f5f5f7", fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif", padding: 16 }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
        @keyframes jbBlink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }
        .jb-cursor { animation: jbBlink 1s steps(1) infinite; }
        @media (prefers-reduced-motion: reduce) { .jb-cursor { animation: none; } }
      `}</style>

      <div style={{ maxWidth: 1320, margin: "0 auto" }}>
        <div style={{ marginBottom: 14 }}>
          <div className="font-semibold" style={{ fontSize: 17 }}>Esqueleto joaobaran.com</div>
          <div style={{ fontSize: 13, color: "#86868b", marginTop: 2 }}>Baixa fidelidade: estrutura, hierarquia e tamanhos reais de texto. Cores e visuais finais vêm nos protótipos de cada dobra.</div>
        </div>

        <div className="flex flex-wrap items-center" style={{ gap: 10, marginBottom: 16 }}>
          <Toggle
            options={[["home", "Home"], ["lista", "/textos"], ["texto", "Texto"], ["404", "404"]]}
            value={page}
            onChange={setPage}
          />
          <Toggle options={[["celular", "Celular"], ["desktop", "Desktop"]]} value={vp} onChange={setVp} />
          <Toggle options={[["on", "Com notas"], ["off", "Sem notas"]]} value={show ? "on" : "off"} onChange={(v) => setShow(v === "on")} />
        </div>

        <Frame width={WIDTHS[vp]}>
          <Page m={m} show={show} go={go} />
        </Frame>
      </div>
    </div>
  );
}
