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
    "Sou CTO da Parcela Mais, uma fintech de saúde que ajuda clínicas de todo o Brasil a oferecer tratamentos parcelados aos pacientes.",
  currentMilestone: {
    year: "2024",
    text: "CTO. Lidero um time de 8 pessoas, com processos de desenvolvimento apoiados por IA.",
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
  closing: "Em todos esses sistemas, o código foi a parte mais fácil. O difícil foi entender o problema certo.",
  cv: "Ver CV",
};

export const textos = {
  title: "Textos",
  lead: "Sobre construir produtos, tecnologia e negócios.",
  viewAll: "Ver todos os textos",
  appearance: {
    label: "Aparição",
    title: "Podcast Sem Codar, conversa com Renato Asse",
    // URL pendente: ver item da BAR-19 ("URL do episódio do podcast Sem Codar").
    href: "#",
  },
  invite: {
    title: "Quer continuar a conversa?",
    cta: "Entrar em contato",
    viewOthers: "Ver outros textos",
  },
};
