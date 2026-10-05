# Especificação: joaobaran.com (fase 1)

Documento de construção para o Claude Code. Todas as decisões abaixo já foram tomadas no planejamento. Na dúvida, prefira a solução mais simples.

O protótipo original (`docs/specs/prototypes/`, com `site-full.jsx` e as dobras separadas) guiou a construção da fase 1 e foi removido do repositório depois que o site já refletia o que estava nele (BAR-26). O site em produção é a referência visual atual.

Fonte das decisões: página do Notion "Projeto: Site joaobaran.com".

---

## 1. Objetivo

Site pessoal e canal próprio do João Baran. LinkedIn, GitHub, YouTube e X apontam para ele.

- **Mensagem central:** esse cara sabe fazer produto. Une execução, design e negócio.
- **Referência de experiência:** o site da Apple. Tipografia grande, muito respiro, movimento discreto, acabamento impecável.
- **Públicos:** CTOs e tech leads avaliando o João para vagas de Engenheiro de Software Pleno/Sênior ou Tech Lead, e pessoas não técnicas que precisam entender o que ele faz sem dominar os termos.
- **Ação principal:** entrar em contato. O CV fica acessível para quem avalia.

---

## 2. Regras de conteúdo (obrigatórias)

1. Nunca usar as palavras "sócio", "partner" ou "estagiário".
2. Não mencionar empresa própria nem serviços de freela. Evitar a palavra "projetos" em convites de contato.
3. Não usar travessão (—) em nenhum texto do site. Usar ponto, vírgula ou dois-pontos.
4. Números sempre com "mais de" e iguais ao CV e ao LinkedIn: mais de 7 mil clínicas, mais de R$100 milhões transacionados, mais de 40 mil pessoas com acesso ampliado a tratamentos, time de 8 pessoas.
5. Tempo verbal: o status atual fica no presente e as entregas no passado.
6. Nenhum nome de instituição financeira parceira da Parcela Mais.
7. Idioma: português do Brasil (`lang="pt-BR"`). Todo texto de interface fica centralizado em arquivos de conteúdo para permitir versão em inglês no futuro (em `/en`, sem quebrar URLs atuais).

---

## 3. Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Motion (antigo Framer Motion) para animações
- Fonte Inter via `next/font/google`, pesos 400, 600 e 700
- pnpm como gerenciador de pacotes, com a versão do Node fixada no projeto (`.nvmrc` e `engines`)
- Vitest para testes
- GitHub Actions rodando lint, typecheck e testes em todo PR
- Deploy na Vercel (plano gratuito), com prévia automática por PR
- `@vercel/analytics` para métricas
- Repositório privado no GitHub
- Sem banco de dados, sem CMS, sem backend na fase 1

---

## 4. Rotas

| Rota | Conteúdo |
|---|---|
| `/` | Página única com todas as seções |
| `/textos` | Lista de todos os textos |
| `/textos/[slug]` | Página de um texto |
| `/cv` | Redireciona para `/joao-baran-cv.pdf` (abre no navegador) |
| `/llms.txt` | Resumo para IAs (seção 11) |
| `/sitemap.xml`, `/robots.txt` | SEO (seção 11) |
| qualquer outra | Página 404 |

Âncoras da home: `#experiencia`, `#textos`, `#canais`, `#contato`.

---

## 5. Estrutura de arquivos sugerida

Estrutura e código em inglês; textos para pessoas (conteúdo do site, specs, documentação) em português. Nomes em kebab-case, sem acentos. As URLs públicas continuam em português (`/textos`), porque fazem parte do conteúdo.

```
AGENTS.md                instruções para Claude Code e Codex
app/
  layout.tsx             fonte, metadados base, Analytics, link "Pular para o conteúdo"
  page.tsx               home
  textos/page.tsx        lista de textos (URL pública em português)
  textos/[slug]/page.tsx
  not-found.tsx
  opengraph-image.tsx
  textos/[slug]/opengraph-image.tsx
  icon.svg
  apple-icon.png
  sitemap.ts
  robots.ts
  llms.txt/route.ts
components/
  menu, hero, experience, diagrams/*, timeline, posts, channels, contact, footer, reveal, cursor, copy-email
content/
  site.ts                textos da interface e campos de status (seção 7.0)
  posts/<slug>.md        um arquivo por texto
lib/
  posts.ts               leitura e validação dos textos
public/
  joao-baran-cv.pdf
  images/joao-baran-contact.jpg
  posts/<slug>/          imagens de cada texto
docs/
  specs/site-phase-1.md  esta especificação
  specs/prototypes/      protótipos .jsx (referência visual)
  decisions/             ADRs curtos
scripts/
  import-substack.ts
.github/workflows/ci.yml lint, typecheck e testes em todo PR
```

---

## 6. Design system

### 6.1 Tema

Só escuro na fase 1. Preto puro na home. Space Gray como fundo de leitura na página de texto. Nunca branco puro sobre preto puro em texto corrido.

### 6.2 Cores (tokens do Tailwind)

| Token | Hex | Uso |
|---|---|---|
| `bg` | #0A0A0A | Fundo da home (identidade "Construindo o Futuro", BAR-25) |
| `surface` | #1D1D1F | Cards, fundo da página de texto, linhas divisórias |
| `text` | #F8FAFF | Títulos e corpo (BAR-25) |
| `text-2` | #D2D2D7 | Linhas de apoio |
| `text-3` | #86868B | Datas, legendas, metadados |
| `accent` | #007AFF | Links, cursor (traço), destaques, foco |
| `accent-2` | #1A87FF | Link dentro da página do texto (fundo `surface`): `accent` some do contraste AA ali (4.19, mínimo 4.5); `accent-2` dá 4.77. Achado e aprovado na revisão final (BAR-18) |
| `button` | #0071E3 | Fim do gradiente do botão principal (texto branco) |
| `button-hover` | #0077ED | Documentado, sem uso: o hover do botão principal virou o brilho da seção 6.6.1 (BAR-25) |
| `glow` | #00C2FF | Brilho do cursor e do horizonte animado (BAR-25) |
| `glow-deep` | #0B3DFF | Início do gradiente do botão principal e do halo do horizonte (BAR-25) |

Cores auxiliares (#34C759, #FFCC00, #FF3B30, #FF9500) ficam documentadas mas não são usadas na fase 1.

Motivo do azul de botão: branco sobre #007AFF não passa no contraste AA em tamanho de botão. O gradiente (6.6.1) termina em #0071E3, que passa.

### 6.3 Tipografia

Família única: Inter. Sem fonte monoespaçada.

| Nível | Desktop | Celular | Peso | Espaçamento |
|---|---|---|---|---|
| Display (título do hero) | 80px | 44px | 700 | -0.02em, altura de linha 1.05 |
| Título de seção | 48px | 32px | 700 | -0.02em, altura de linha 1.1 |
| Número de impacto | 44px | 32px | 700 | -0.02em |
| Frase de fechamento | 32px | 24px | 600 | -0.01em, altura de linha 1.3 |
| Subtítulo | 24px | 20px | 600 | altura de linha 1.25 |
| Linha de apoio do hero | 21px | 17px | 400 | altura de linha 1.5 |
| Corpo | 19px | 17px | 400 | altura de linha 1.5 |
| Pequeno | 14px | 14px | 400 | altura de linha 1.4 |
| Botão | 17px | 17px | 600 | |

Coluna de leitura da página de texto: cerca de 680px (65 a 75 caracteres por linha).

### 6.4 Layout e espaçamento

- Breakpoints: celular abaixo de 768px; desktop a partir de 1024px; entre os dois, layout de desktop com margem lateral de 48px.
- Margem lateral: 20px no celular, 96px no desktop. Largura máxima do conteúdo: 1088px, centralizada em telas maiores.
- Espaço vertical entre seções: 72 a 80px no celular, 120 a 140px no desktop.
- Raios: cards e foto 24px; botões totalmente arredondados.
- Linhas divisórias: 1px na cor `surface`.
- Texto sempre alinhado à esquerda.

### 6.5 Botões

- **Principal:** gradiente 135deg de `glow-deep` a `button`, texto branco, padding 14px 28px (desktop) e 13px 24px (celular). Borda interna e sombra com brilho (6.6.1, BAR-25); hover intensifica a sombra; clique com escala 0.98.
- **Secundário:** sem fundo, borda 1px `text-3`, texto `text`. Hover com borda `text`.
- **Link de texto:** cor `accent`, sublinhado no hover.
- Foco visível em todos os elementos interativos: contorno 2px `accent`, afastamento de 3px.

### 6.6 Movimento

- Seções e blocos surgem uma única vez ao entrar na tela: opacidade de 0 para 1 e deslize de 20px para 0. Duração de 600ms, curva `cubic-bezier(0.22, 1, 0.36, 1)`. Itens em sequência com intervalo de 60 a 80ms.
- Hover de botões, cards e links: 200ms.
- Números não contam. Sem parallax, sem seções fixas.
- Rolagem suave ao clicar nas âncoras do menu.
- **Excessão:** o horizonte animado do hero (6.6.1) roda continuamente, não uma única vez. Motivo, limites e controles de acessibilidade em `docs/decisions/002-animated-hero-background.md`.

#### 6.6.1 Horizonte animado do hero (BAR-25)

Fundo do hero, atrás do conteúdo, de baixo para cima:

1. **Camada móvel** (`position: absolute; inset: -5%`) com um SVG contendo a imagem do horizonte (`public/images/horizon.jpg`, gerada de `assets/brand/horizon.png`, até 120KB) e um foco de luz que desliza por um arco (`animateMotion`, 18s, ida e volta) com um pulso de opacidade (6s). A camada toda tem uma deriva lenta só de `transform` (escala e translação, 16s, ida e volta).
2. **Sombra** para a legibilidade: gradiente horizontal, mais escuro à esquerda (onde fica o texto) e mais claro à direita.
3. **Conteúdo do hero**, sem mudança de texto, estrutura ou digitação.

No celular, a imagem alinha à direita (`preserveAspectRatio="xMaxYMid slice"`) e o arco da luz usa um trecho diferente, para a luz não sair do quadro.

**Controles**, documentados em `docs/decisions/002-animated-hero-background.md`:
- Sem botão de pausa e sem tratamento de `prefers-reduced-motion`: a animação roda igual para todos (BAR-66).
- A animação pausa quando o hero sai da tela (`IntersectionObserver`).

### 6.7 Assinatura visual: o cursor

Uma barra em `glow` (#00C2FF, com brilho: `box-shadow` duplo) de 4px (celular) e 6px (desktop) de largura e 0.82em de altura, piscando a cada 1.05s com transição em degrau. Uso aprovado no hero. Uso em outros pontos (títulos de seção, favicon) está em teste: implementar só no hero e deixar um componente reutilizável.

---

## 7. Home: seções e textos finais

O protótipo original tinha os componentes em português (ver nota da seção 1); no código, os nomes ficaram em inglês, conforme a seção 5.

### 7.0 Campos de status (content/site.ts)

O cargo atual fica num único lugar, para ser trocado de uma vez quando mudar:

```ts
export const status = {
  role: "CTO",
  company: "Parcela Mais",
  currentLine: "Construí o sistema inteiro da Parcela Mais, fintech de saúde que ajuda clínicas de todo o Brasil a oferecer tratamento parcelado.",
  currentMilestone: { year: "2024", text: "CTO. Liderei um time de 8 pessoas, com processos de desenvolvimento apoiados por IA." },
};
```

### 7.1 Menu

- Esquerda: "João Baran" em texto (600, 16px desktop e 15px celular), leva ao topo.
- Direita: Experiência, Textos, Contato (14px, cor `text-2`, hover `text`), âncoras da home.
- Sem menu hambúrguer: os três itens ficam visíveis no celular.
- Altura de 60px no desktop e 52px no celular, com linha inferior `surface`.
- Nas páginas `/textos` e `/textos/[slug]`, os itens levam para `/#experiencia`, `/textos` e `/#contato`.

### 7.2 Abertura (hero)

```
Construindo o futuro.
Engenheiro de software. Transformo problemas de negócio em produtos.
[Entrar em contato]  → #contato
```

- Fundo com o horizonte animado (6.6.1, BAR-25), sem números, um botão só.
- Não ocupa 100% da tela: o título da Experiência precisa aparecer na borda inferior como sinal de que a página continua.
- **Digitação do título:**
  - O texto completo existe no HTML desde o servidor (SEO e leitores de tela). O `h1` tem `aria-label` com o texto completo e as letras individuais ficam com `aria-hidden`.
  - Cada letra é um `span` com opacidade controlada, para o espaço do título estar reservado desde o início. A quebra de linha no celular não pode mudar durante a digitação e não pode haver deslocamento de layout.
  - Início após 300ms, 45ms por letra (cerca de 1 segundo no total).
  - Roda só uma vez por sessão (marcar em `sessionStorage`). Nas visitas seguintes da sessão, o título aparece completo.
  - Evitar piscar o texto na primeira pintura: as letras só são escondidas quando o JavaScript está ativo (por exemplo, uma classe no `html` aplicada por script inline antes da pintura). Sem JavaScript, o título aparece inteiro.
  - O cursor acompanha a última letra digitada e continua piscando depois.
  - A linha de apoio surge 150ms depois do fim da digitação e o botão 280ms depois, com deslize de 12px.

### 7.3 Experiência (`#experiencia`)

**Abertura da seção**
```
De desenvolvedor a CTO na mesma empresa.
{status.currentLine}
```

**Faixa de impacto** (3 colunas no desktop, empilhado no celular). Cada item tem "Mais de" pequeno em `text-3`, o número grande e a legenda em `text-2`:
- Mais de **7 mil** · clínicas atendidas
- Mais de **R$100 milhões** · transacionados
- Mais de **40 mil** · pessoas com acesso ampliado a tratamentos

**Cinco blocos** (texto e diagrama lado a lado no desktop, alternando o lado a cada bloco; empilhados no celular com o texto primeiro). Em cada bloco: título (subtítulo), frase do problema em `text-3`, frase do que foi feito em `text`.

1. **Plataforma de cobrança**
   A clínica quer oferecer parcelamento, mas não pode virar banco para cobrar o paciente todo mês.
   Construí a plataforma que acompanha cada parcela até o pagamento, para a clínica focar no atendimento.
2. **Motor de análise de crédito**
   Antes de parcelar, é preciso saber se o paciente consegue pagar e se ele é quem diz ser.
   Arquitetei o motor que analisa o crédito e ajuda a prevenir fraude.
3. **Integrações com bancos e API pública**
   Uma fintech depende de conversar com bancos e de deixar grandes clientes se conectarem a ela.
   Construí as integrações diretas com instituições financeiras e a API usada por clientes enterprise.
4. **IA dentro do produto**
   Ler notas fiscais à mão é lento e sujeito a erro.
   Coloquei um modelo de IA para ler as notas e extrair os dados automaticamente, como parte do sistema.
5. **Trocar a base sem parar a operação**
   Quando o volume de transações superou a tecnologia original, foi preciso trocá-la com tudo rodando.
   Conduzi a migração de Bubble para Xano sem downtime e sem reescrever tudo do zero.

**Diagramas:** componentes React em SVG, copiados e adaptados de `fold-2-experience.jsx` (`DiagCobranca`, `DiagCredito`, `DiagIntegracoes`, `DiagIA`, `DiagMigracao`). Área 4:3 dentro de um card `surface` com raio 24px. Cada SVG tem `role="img"` e `aria-label` descrevendo o diagrama. Nomes genéricos (Banco A, Cliente 1). O azul marca o que o João construiu ou o resultado.

**Trajetória** (linha horizontal com 4 marcos no desktop; linha vertical no celular). O marco atual tem ponto azul preenchido, os outros ponto vazado:
- **Aos 16:** Aprendi a programar na escola pública.
- **2021:** Desenvolvedor. Entrei para construir o primeiro produto da empresa.
- **2023:** Tech Lead. Assumi a evolução técnica da plataforma.
- **{status.currentMilestone.year}:** {status.currentMilestone.text}

**Fechamento**
```
Meu trabalho é achar o problema que vale resolver e colocar a solução no ar.
[Ver CV]  → /cv (botão secundário, abre em nova aba)
```

### 7.4 Textos (`#textos`)

```
Textos
Sobre construir produtos, tecnologia e negócios.
```

- Três cards (`surface`, raio 24px) com data, título e resumo. Mostram os textos com `featured: true`, do mais recente para o mais antigo, no máximo 3. Se houver menos de 3 destaques, completar com os mais recentes.
- (BAR-71) A aparição saiu de "Textos" e virou a seção própria "Aparições", entre "Textos" e "Canais": card grande com miniatura 16:9 (servida do repositório, sem requisição ao YouTube), ícone de play e o título "Podcast Sem Codar, conversa com Renato Asse", linkando para a playlist, em nova aba.
- Botão secundário "Ver todos os textos" → `/textos`.

### 7.5 Canais (`#canais`)

Título "Canais". Lista com linhas divisórias; cada linha é um link inteiro (abre em nova aba), com seta que se move no hover. No desktop: nome, descrição e handle à direita. No celular: nome com seta, descrição abaixo.

| Canal | Descrição | Link |
|---|---|---|
| LinkedIn | Trajetória e bastidores de carreira. | linkedin.com/in/joaovictorbaran |
| GitHub | Código e projetos. | pendente |
| YouTube | Vídeos sobre tecnologia, produto e carreira. | youtube.com/@joaobaran |
| X | Construção em público. | pendente |

Instagram entra quando o perfil for definido. Substack não aparece no site.

### 7.6 Contato (`#contato`)

Seção final azul, centralizada (BAR-68 e BAR-72). Sem foto: a esfera do favicon, desenhada em CSS com os tokens do hero (`glow-deep`, `accent`, `glow`), fica atrás do texto como forma de fundo (45% de opacidade, estática, sem imagem). O fundo da seção é um degradê de `bg` para `glow-deep` a 22% (`color-mix`).

```
Chegou até aqui? Vamos conversar.|   (cursor azul piscando)
Engenharia, produto ou uma oportunidade: me chama por onde for mais fácil.
[Enviar e-mail]  [WhatsApp]  [LinkedIn]
contato@joaobaran.com  [ícone copiar]
```

- **Enviar e-mail** (botão principal): `mailto:` com assunto "Contato pelo site". **WhatsApp**: `wa.me` do número comercial com mensagem pronta. **LinkedIn**: perfil. Externos abrem em nova aba com `rel="noopener noreferrer"`. Alvos de toque de pelo menos 48px de altura.
- O e-mail aparece em texto pequeno, com um ícone de copiar ao lado (botão de 44px, `aria-label="Copiar e-mail"`). Ao copiar: o ícone vira um check azul e aparece um balão "Copiado" por 2 segundos, anunciado por uma região `role="status"`. Usar a API de área de transferência com alternativa para navegadores antigos.
- Contraste do texto sobre a esfera: no mínimo 4,5:1 (a esfera é mais discreta que o texto).

### 7.7 Rodapé

Linha superior `surface`. E-mail (mailto), "CV" (→ `/cv`) e o ano atual (gerado automaticamente). Texto 14px em `text-3`, hover `text`. Sem ícones de redes.

---

## 8. Outras páginas

### 8.1 /textos

Menu, título "Textos" (título de seção), linha de apoio "Sobre construir produtos, tecnologia e negócios." e a lista de todos os textos publicados, do mais recente para o mais antigo. Cada item com data, título e resumo, separados por linhas `surface`. Sem imagem de capa. Largura máxima de cerca de 760px. Rodapé.

### 8.2 /textos/[slug]

- Fundo `surface` na área de leitura. Coluna de cerca de 680px, centralizada.
- Link "Textos" (voltar), título, data e tempo de leitura (cerca de 200 palavras por minuto), corpo do texto.
- Estilo do corpo: 19px desktop e 17px celular, altura de linha 1.6, cor `text`. Títulos internos, listas, citações, código e imagens com estilo coerente com o design system. Imagens com `next/image` e raio de 16px. Links em `accent`.
- No fim, um card de convite: "Quer continuar a conversa?" com botão principal "Entrar em contato" (→ `/#contato`) e link "Ver outros textos" (→ `/textos`). Texto a validar com o João.
- Páginas geradas estaticamente no build.

### 8.3 404

```
Esta página não existe.
Talvez o link esteja errado ou o texto tenha mudado de lugar.
[Voltar para o início]
```

---

## 9. Conteúdo dos textos

### 9.1 Formato

Markdown simples (não MDX). Um arquivo por texto em `content/posts/<slug>.md`. Imagens em `public/posts/<slug>/`, referenciadas por caminho absoluto. Decisão registrada em `docs/decisions/001-content-in-markdown.md`.

```md
---
title: "Título do texto"
date: 2026-09-23
summary: "Uma linha que aparece nos cards e na lista."
featured: false
draft: false
---

Corpo em Markdown.
```

- `featured: true` coloca o texto na home (máximo de 3 considerados).
- `draft: true` exclui o texto do build de produção, do sitemap e do llms.txt.
- O slug vem do nome do arquivo.
- Validar o cabeçalho no build (erro claro se faltar campo obrigatório).

### 9.2 Importação do Substack (antes do lançamento)

O João vai exportar o arquivo do Substack e indicar quais textos entram. Criar `scripts/import-substack.ts` que:
1. lê o export (HTML dos posts e a planilha de metadados);
2. converte os posts selecionados para Markdown com o cabeçalho acima;
3. baixa todas as imagens para `public/posts/<slug>/` e reescreve os caminhos (nada pode apontar para servidores do Substack);
4. remove blocos específicos do Substack (botões de inscrição, compartilhamento);
5. mantém a data original de publicação.

Nenhum texto é importado sem a lista do João.

### 9.3 Publicação de textos novos

Ordem obrigatória: primeiro no site, depois no Substack com o link "publicado originalmente em joaobaran.com".

---

## 10. Acessibilidade e qualidade

- Contraste AA em todo texto.
- Um único `h1` por página; hierarquia de títulos correta.
- Link "Pular para o conteúdo" visível no foco.
- Navegação completa por teclado com foco visível.
- Animações das demais seções respeitam `prefers-reduced-motion` (seção 6.6); o hero é exceção (BAR-66).
- Alvos de toque de pelo menos 40px.
- Metas de Lighthouse no celular: 95 ou mais em Performance, Acessibilidade, Boas práticas e SEO. Deslocamento de layout (CLS) zero no hero.

---

## 11. SEO e descoberta por IA

- **Metadados:** modelo de título "%s | João Baran". Home: "João Baran | Engenheiro de Software". Descrição da home: "Engenheiro de software e CTO. Transformo problemas de negócio em produtos, do zero à produção, com experiência em fintech e IA aplicada." Cada texto usa o próprio título e resumo.
- **URL canônica** em todas as páginas, com domínio joaobaran.com.
- **Imagem de compartilhamento** gerada com `next/og` (1200 x 630): fundo preto, "Construindo o futuro." com o cursor azul, "João Baran", "Engenheiro de software" e a foto. Nos textos, o mesmo modelo com o título do texto no lugar da frase.
- **Dados estruturados (JSON-LD):** `Person` na home (nome, cargo, empresa atual vinda de `status`, URL, `sameAs` com os canais) e `Article` em cada texto (título, data, autor, imagem).
- **Sitemap** com home, /textos e todos os textos publicados.
- **robots.txt** liberando todos os buscadores, incluindo os robôs de IA (GPTBot, ClaudeBot, PerplexityBot, Google-Extended).
- **/llms.txt** gerado no build: nome, um parágrafo sobre quem o João é e o que faz, links dos canais e a lista de textos (título, URL e resumo).
- Todas as páginas renderizadas no servidor ou geradas estaticamente, com o texto completo no HTML. Nunca carregar conteúdo só no navegador.

---

## 12. Ícones

- `app/icon.png`: a esfera da identidade "Construindo o Futuro" (`assets/brand/sphere.png`), fundo transparente fora do círculo (BAR-25). Substitui o monograma "JB" da fase inicial.
- `app/apple-icon.png` (180 x 180): a mesma esfera, fundo `#0A0A0A` (iOS não aceita transparência).

---

## 13. Analytics

`<Analytics />` do `@vercel/analytics` no layout. Sem cookies e sem banner de consentimento. Nenhuma outra ferramenta de rastreamento.

---

## 14. CV

- Arquivo `public/joao-baran-cv.pdf` (fornecido pelo João).
- Redirecionamento temporário de `/cv` para `/joao-baran-cv.pdf` em `next.config`.
- Futuro: versão em inglês em `/cv/en`.

---

## 15. Ordem de construção

A construção é dividida nas issues do projeto `joaobaran` no Linear (BAR-6 a BAR-20), uma por vez, seguindo o loop do `AGENTS.md`: plano antes do código, branch própria, commits pequenos, PR com CI verde e prévia da Vercel, revisão cruzada entre Claude Code e Codex, squash merge.

---

## 16. Publicação no domínio (feita pelo João, com apoio)

O domínio tem e-mail do Google Workspace. Um erro aqui derruba o contato@joaobaran.com.

1. Tirar print de todos os registros de DNS antes de qualquer mudança.
2. Revisar o site na URL provisória da Vercel.
3. Alterar só o registro A (domínio principal) e o CNAME do www, com os valores que a Vercel indicar.
4. Não trocar os nameservers. Não tocar nos registros MX nem nos TXT do Google Workspace.
5. Testar o site e enviar um e-mail de outra conta para contato@joaobaran.com.
6. Só depois cancelar o Framer.

---

## 17. Pendências antes do lançamento

- [ ] PDF do CV em português
- [ ] Export do Substack e lista dos textos a importar, com os 3 destaques
- [ ] URL do GitHub, com o perfil público e pelo menos um README de perfil
- [ ] URL do X
- [ ] URL do episódio do podcast Sem Codar
- [ ] Validar o texto do convite no fim de cada texto (8.2)
- [ ] Opcional: uma foto sentada para a imagem de compartilhamento (senão, usar a foto do contato)

---

## 18. Fora do escopo (fase 2)

Tema claro, curtidas, comentários, contas de usuário, notificações, estante de livros e hobbies, newsletter própria, Instagram, narrativa de rolagem estilo Apple na Experiência, versão em inglês. Para as interações, o banco a decidir é Neon (Postgres, sem pausa manual no plano gratuito) ou Supabase (banco, login e arquivos juntos, mas pausa no plano gratuito). Os textos continuam em Markdown.
