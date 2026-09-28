# 002. Excessão à animação única: o horizonte do hero

Data: 28/09/2026. Status: aceita.

## Contexto

A Spec §6.6 pede que toda animação do site rode uma única vez ao entrar na tela. A identidade visual "Construindo o Futuro" (aprovada em 28/09/2026, BAR-25) pede um horizonte com um foco de luz que se move continuamente atrás do conteúdo do hero, para transmitir a sensação de algo em movimento constante, ligada à mensagem central do site.

## Decisão

O hero ganha uma camada de fundo (`components/horizon-layer.tsx`) com duas animações contínuas, sem fim planejado:

- Uma deriva lenta (16s, ida e volta, só `transform`) na camada inteira.
- Um foco de luz que desliza por um arco (`animateMotion`, 18s, ida e volta) com um pulso de opacidade (6s), dentro de um SVG que também contém a imagem do horizonte.

Isso é uma excessão específica e isolada à regra de animação única. Nenhuma outra animação do site muda.

## Limites e controles de acessibilidade

Justamente por ser contínua (e não uma reação a uma ação da pessoa), essa animação carrega obrigações que as outras não têm:

1. **Só `transform` e `opacity`.** Nada de desfoque, cor ou tamanho de fonte, para o custo de repintura ficar previsível mesmo rodando o tempo todo.
2. **Camadas com `aria-hidden="true"`.** É decoração; o conteúdo real do hero (título, linha de apoio, botão) não muda.
3. **Controle de pausa visível (WCAG 2.2.2).** Um botão no canto do hero pausa e retoma a animação, nos dois sentidos. Isso é exigência formal: a WCAG 2.2.2 pede um jeito de pausar qualquer movimento automático que dure mais de 5 segundos, e aqui não há um fim natural.
4. **`prefers-reduced-motion: reduce` como padrão inicial, não como bloqueio.** Quem pede movimento reduzido no sistema vê a animação já pausada, com a luz parada na metade do percurso (`SVGSVGElement.pauseAnimations()` + `setCurrentTime()` para a parte com SMIL; `animation-play-state` para a deriva em CSS). Mas o botão continua funcionando: se a pessoa quiser ver a animação mesmo assim, um clique resolve. A preferência do sistema é o padrão, não uma trava.
5. **Pausa fora de tela.** Um `IntersectionObserver` pausa a animação quando o hero sai da tela, por desempenho, sem alterar o que o botão mostra (ele reflete a intenção da pessoa, não se o hero está visível).

## Consequências

- O Lighthouse mobile precisa continuar em 95 ou mais nas quatro categorias e CLS zero no hero com essa camada ativa (conferido na BAR-25). Qualquer regressão de performance encontrada depois entra como issue própria, sem reabrir esta decisão.
- Qualquer teste futuro de animação contínua em outro lugar do site (por exemplo, no cursor fora do hero, mencionado como "em teste" na Spec §6.7) deve vir com os mesmos cinco controles, não só copiar a implementação.
- Se a imagem de origem do horizonte (`assets/brand/horizon.png`) for recortada ou trocada, o arco da luz (`docs/specs/site-phase-1.md` §6.6.1) precisa ser medido de novo: ele foi calculado para a imagem atual.
