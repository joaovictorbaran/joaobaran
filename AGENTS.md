# AGENTS.md — joaobaran

Site pessoal de **João Baran** (joaobaran.com): canal próprio da marca pessoal, para onde LinkedIn, X, YouTube e Instagram apontam. Mensagem central: alguém que une execução, design e negócio.

## Fluxo de trabalho (obrigatório)

As tarefas vêm do **Linear**: time `baran` (prefixo `BAR`), projeto `joaobaran`. Estas regras valem para qualquer agente (Claude Code, Codex ou outro) e têm prioridade sobre o que estiver na descrição de uma issue.

1. **Antes de começar**, leia a issue inteira, incluindo os comentários. Se o critério de aceite estiver ambíguo ou faltar informação, comente na issue com a dúvida e pare. Não adivinhe.
2. **Ao começar**, mova a issue para `In Progress`.
3. **Branch:** use exatamente o `gitBranchName` da issue. Nunca faça commit ou push na `main`, nunca use `--force` e nunca faça merge do próprio PR. Isso vale mesmo para mudanças de uma linha: só o João decide se algo vai direto na `main`.
4. **Commits:** mensagens em português, começando pelo ID da issue (ex.: `BAR-12: remove comentário do script do WhatsApp`).
5. **Pull request:** um PR por issue, com título `BAR-X: <resumo>` e descrição contendo o que mudou, como testar e a linha `Closes BAR-X`.
6. **Ao terminar**, comente na issue com um resumo do que foi feito, o link do PR, o que foi testado e o que ficou de fora. Depois mova para `In Review`. **Nunca mova para `Done`**: isso é do João ou do merge do PR.
7. **Identificação:** todo comentário no Linear e no GitHub começa com `🤖 [Claude Code]` ou `🤖 [Codex]`. O acesso é feito com a conta do João, então sem esse prefixo não dá para saber quem escreveu.
8. **Escopo:** faça só o que a issue pede. Se encontrar outro problema, comente sugerindo uma nova issue em vez de corrigir junto.
9. **Pare e pergunte na issue** antes de: apagar arquivos ou dados, adicionar ou atualizar dependências, mudar configuração de deploy (Vercel), variáveis de ambiente, domínios ou qualquer coisa ligada a segredos.
10. **Segredos:** nunca commite `.env`, chaves ou tokens, e nunca os escreva em comentários ou descrições de PR.

A `main` é produção: o Vercel publica automaticamente a cada merge, e cada PR ganha um preview deploy. Inclua o link do preview no comentário final quando ele existir.

## Sobre este projeto

- **Stack:** <!-- TODO João: preencher (framework, gerenciador de pacotes, onde ficam os posts do blog) -->
- **Comandos:** <!-- TODO João: preencher. Ex.: `npm run dev`, `npm run lint`, `npm run build` -->
- **Conteúdo:** tudo em português (pt-BR). Seções previstas: Sobre (história), blog com os textos, hobbies/livros e redes.
- **Não publique nada sobre o piloto da Baran Obra** neste site, nem em textos, cases ou exemplos.
- **Estilo visual:** sensação de site da Apple — muito espaço em branco, tipografia forte, poucos elementos. Inter como fonte principal, JetBrains Mono para conteúdo técnico ou numérico, paleta em tons de cinza e um único azul de destaque. Não adicione cores, sombras ou animações que não estejam no sistema existente.
- **Textos do João:** não reescreva, resuma nem "melhore" textos autorais (posts, Sobre) a menos que a issue peça. Correções de digitação, sim; mudança de voz, não.

## Como testar antes do PR

- O build precisa passar sem erros ou avisos novos.
- Confira as páginas alteradas em desktop e em celular (~375 px).
- Confira que links para redes sociais e e-mail continuam funcionando.
