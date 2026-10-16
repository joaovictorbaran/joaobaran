---
title: "O fluxo de trabalho com IA que finalmente me deixou feliz"
date: 2026-10-16
summary: "Como divido o trabalho entre Notion, Linear, agentes, GitHub e Vercel, e por que quem marca o Done continua sendo uma pessoa."
featured: true
draft: false
cover: "/posts/fluxo-de-trabalho-com-ia/capa.png"
---

Na primeira tarefa que deixei um agente executar sozinho, ele fez push direto na main e marcou a issue como concluída. O código funcionava, mas ninguém tinha revisado nada. O erro foi meu também: eu não tinha explicado até onde o agente podia ir.

A partir dali, parei de tratar o fluxo como uma coleção de ferramentas e comecei a definir responsabilidades. Hoje, o que me deixa mais tranquilo não é uma IA específica. É saber onde ficam as decisões, como uma ideia vira trabalho executável e quem responde pelo resultado. As ferramentas mudam; esse raciocínio tende a durar mais.

## Onde cada parte acontece

As regras de negócio, as decisões e o motivo de cada escolha ficam no Notion. Se alguém, pessoa ou IA, perguntar por que algo funciona daquele jeito, tento deixar a resposta registrada ali.

Quando surge um problema, converso com Claude ou GPT para entendê-lo, comparar alternativas e transformar a ideia numa tarefa clara. Também uso esse momento para analisar dados e experimentar protótipos visuais antes de mexer no código.

Quando a ideia está suficientemente definida, ela vira uma issue no Linear. Para mim, uma issue precisa dizer qual é o contexto, o que deve ser feito, como vou reconhecer que deu certo e o que está fora do escopo. Se ainda não consigo explicar o critério de aceite, a tarefa não está pronta para execução.

O agente consulta o `AGENTS.md` do repositório, onde ficam as instruções daquele projeto. Depois, o trabalho passa pelo GitHub: abre um pull request e precisa passar pela integração contínua antes de entrar na main. Ao abrir o PR, a Vercel gera um preview deploy para revisão. Depois do squash merge na main, a Vercel faz o deploy automático de produção.

![Fluxograma em seis etapas. Pensar: Claude ou ChatGPT constroem a ideia, salvando e consultando o Notion, o segundo cérebro. Especificar: a ideia vira tarefas no Linear. Executar: um agente, Claude Code ou Codex, faz o trabalho seguindo o AGENTS.md. Validar: o GitHub recebe o pull request, roda a integração contínua e mostra o preview; depois vem a revisão, com aprovação manual. Publicar: aprovado, o merge leva ao deploy na Vercel. Se não passar na revisão, o trabalho volta para a tarefa.](/posts/fluxo-de-trabalho-com-ia/fluxo.png)

## Por que escolhi o Linear

No começo, tentei usar as issues do próprio GitHub. Fazia sentido manter as tarefas junto do código, mas, na configuração que eu usava, não conseguia acessá-las pelo chat do Claude. Isso quebrava o fluxo justamente quando eu estava definindo o trabalho.

Eu já conhecia Jira e Confluence, mas achava que mostravam mais informação do que eu precisava trabalhando sozinho. Testei o Linear porque queria uma interface mais simples e uma forma de ler e escrever issues direto do chat com a IA. Para o meu uso, resolveu.

## Limites antes de velocidade

Depois daquele primeiro push, estabeleci algumas regras. O agente pode levar uma tarefa até **In Review**; quem marca **Done** sou eu. Todo trabalho passa por um pull request. Não há commit direto na main. E uma exceção só vale quando eu mesmo a registro na issue, nunca por decisão do agente.

Pode soar burocrático, mas é parecido com o que eu esperaria de qualquer pessoa nova no time: entender o trabalho, respeitar os limites combinados e pedir revisão antes de considerar a tarefa concluída.

Também quis evitar que o processo dependesse de uma ferramenta específica. As instruções ficam no `AGENTS.md`, não num arquivo exclusivo do Claude Code ou do Codex. Assim, posso trocar quem executa sem trocar a issue nem reconstruir as regras. O processo é meu; a IA é quem executa.

A mesma fila de trabalho também poderia ser usada por outras pessoas: cada uma pega uma issue, abre um pull request e espera revisão. Ainda não testei esse fluxo com uma equipe. Por enquanto, é uma possibilidade que a estrutura permite, não um resultado que eu já tenha comprovado.

## O que melhorou e o que custa

O processo não eliminou o trabalho de manutenção. O Notion e o repositório podem se desalinhar: uma decisão muda no código e a documentação fica para trás, ou acontece o contrário. De tempos em tempos, preciso conferir os dois.

Meu trabalho também mudou. Hoje escrevo menos código e passo mais tempo especificando tarefas e revisando resultados. Uma issue mal escrita pode gerar um pull request ruim em menos tempo. A velocidade não compensa uma especificação preguiçosa.

Ainda assim, o saldo tem sido positivo. Em cerca de duas semanas, mais de 100 issues foram fechadas nesse fluxo. Num dos projetos, um teste para garantir que um cliente nunca veja os dados de outro encontrou cinco falhas antes de qualquer dado real entrar no sistema. O teste revelou problemas que a revisão do código, sozinha, não tinha revelado.

Isso também mudou o que considero importante no trabalho de engenharia. Escrever código continua contando. Mas, nesse modelo, pesa muito saber explicar o problema, definir o que não deve ser feito e revisar com critério, inclusive reconhecer quando o resultado ainda não está bom.

Daqui a seis meses talvez eu use outras ferramentas. Espero continuar fazendo o mesmo percurso: entender o problema, escrever o que precisa ser feito, deixar a execução acontecer dentro de limites claros e revisar o resultado. A IA acelera partes desse trabalho. A responsabilidade pelo que chega à produção continua sendo minha.

Se você trabalha com agentes de outro jeito, me conta o que tem funcionado. Vou gostar de comparar.

João Baran
