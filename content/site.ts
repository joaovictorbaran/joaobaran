export const menu = {
  brand: "João Baran",
  links: [
    { label: "Experiência", anchor: "experiencia" },
    { label: "Textos", anchor: "textos", pageHref: "/textos" },
    { label: "Contato", anchor: "contato" },
  ],
};

export const hero = {
  title: "Construindo o futuro.",
  support: "Engenheiro de software. Transformo problemas de negócio em produtos.",
  cta: "Entrar em contato",
};

export const status = {
  role: "CTO",
  company: "Parcela Mais",
  currentLine:
    "Construí o sistema inteiro da Parcela Mais, fintech de saúde que ajuda clínicas de todo o Brasil a oferecer tratamento parcelado.",
  currentMilestone: {
    year: "2024",
    text: "CTO. Liderei um time de 8 pessoas, com processos de desenvolvimento apoiados por IA.",
  },
};

export const experience = {
  title: "De desenvolvedor a CTO na mesma empresa.",
  impact: [
    { value: "7 mil", label: "clínicas atendidas" },
    { value: "R$100 milhões", label: "transacionados" },
    { value: "40 mil", label: "pessoas com acesso ampliado a tratamentos" },
  ],
  blocks: [
    {
      title: "Plataforma de cobrança",
      problem:
        "A clínica quer oferecer parcelamento, mas não pode virar banco para cobrar o paciente todo mês.",
      solution:
        "Construí a plataforma que acompanha cada parcela até o pagamento, para a clínica focar no atendimento.",
    },
    {
      title: "Motor de análise de crédito",
      problem: "Antes de parcelar, é preciso saber se o paciente consegue pagar e se ele é quem diz ser.",
      solution: "Arquitetei o motor que analisa o crédito e ajuda a prevenir fraude.",
    },
    {
      title: "Integrações com bancos e API pública",
      problem: "Uma fintech depende de conversar com bancos e de deixar grandes clientes se conectarem a ela.",
      solution:
        "Construí as integrações diretas com instituições financeiras e a API usada por clientes enterprise.",
    },
    {
      title: "IA dentro do produto",
      problem: "Ler notas fiscais à mão é lento e sujeito a erro.",
      solution:
        "Coloquei um modelo de IA para ler as notas e extrair os dados automaticamente, como parte do sistema.",
    },
    {
      title: "Trocar a base sem parar a operação",
      problem:
        "Quando o volume de transações superou a tecnologia original, foi preciso trocá-la com tudo rodando.",
      solution:
        "Conduzi a migração de Bubble para Xano sem downtime e sem reescrever tudo do zero.",
    },
  ],
  milestones: [
    { year: "Aos 16", text: "Aprendi a programar na escola pública." },
    { year: "2021", text: "Desenvolvedor. Entrei para construir o primeiro produto da empresa." },
    { year: "2023", text: "Tech Lead. Assumi a evolução técnica da plataforma." },
  ],
  closing: "Meu trabalho é achar o problema que vale resolver e colocar a solução no ar.",
  cv: "Ver CV",
};

export const siteUrl = "https://joaobaran.com";

export const seo = {
  titleTemplate: "%s | João Baran",
  homeTitle: "João Baran | Engenheiro de software",
  homeDescription:
    "Engenheiro de software, ex-CTO de uma fintech de saúde. Transformo problemas de negócio em produtos, do zero à produção, com experiência em fintech e IA aplicada.",
};

export const email = "contato@joaobaran.com";

export const channels = [
  {
    name: "LinkedIn",
    description: "Trajetória e bastidores de carreira.",
    handle: "in/joaovictorbaran",
    href: "https://www.linkedin.com/in/joaovictorbaran",
  },
  {
    name: "GitHub",
    description: "Código e projetos.",
    handle: "github.com/joaovictorbaran",
    href: "https://github.com/joaovictorbaran",
  },
  {
    name: "YouTube",
    description: "Vídeos sobre tecnologia, produto e carreira.",
    handle: "@joaobaran",
    href: "https://www.youtube.com/@joaobaran",
  },
  {
    name: "X",
    description: "Construção em público.",
    handle: "@joaovbaran",
    href: "https://x.com/joaovbaran",
  },
];

export const canais = {
  title: "Canais",
};

export const contact = {
  title: "Vamos conversar.",
  lead: "Quer falar sobre engenharia, produto ou uma oportunidade? Me manda um e-mail.",
  photoAlt: "João Baran de camisa branca, com os braços cruzados",
  linkedin: "Ou fale comigo no LinkedIn",
};

export const footer = {
  cv: "CV",
};

export type Aparicao = {
  title: string;
  href: string;
  image: { src: string; alt: string; width: number; height: number };
};

// Para adicionar uma aparição, incluir um item aqui e a miniatura em public/images/aparicoes/.
export const aparicoes: { title: string; items: Aparicao[] } = {
  title: "Aparições",
  items: [
    {
      title: "Podcast Sem Codar, conversa com Renato Asse",
      href: "https://youtube.com/playlist?list=PL25tm4Xi9g3ygCnQjSm0qCBgpSvl6RHSL",
      image: {
        src: "/images/aparicoes/sem-codar.jpg",
        alt: "Miniatura do vídeo do podcast Sem Codar, com o texto “Tech lead, R$45 milhões, no code”",
        width: 1280,
        height: 720,
      },
    },
  ],
};

export const textos = {
  title: "Textos",
  lead: "Sobre construir produtos, tecnologia e negócios.",
  viewAll: "Ver todos os textos",
  invite: {
    title: "Quer continuar a conversa?",
    cta: "Entrar em contato",
    viewOthers: "Ver outros textos",
  },
};
