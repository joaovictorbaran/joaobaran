# 001. Textos em Markdown no repositório, sem banco na fase 1

Data: 26/09/2026. Status: aceita.

## Contexto

O blog precisa de textos importados do Substack e de textos novos, com páginas geradas no servidor para serem encontradas por buscadores e IA. A fase 2 prevê curtidas, comentários e contas.

## Decisão

Cada texto é um arquivo Markdown em `content/posts/<slug>.md`, com imagens em `public/posts/<slug>/`. Sem CMS e sem banco na fase 1.

## Motivos

- Um banco exigiria um painel de edição com login e upload, maior que o próprio blog.
- O plano gratuito do Supabase pausa o projeto após inatividade, e um site estático quase não consulta o banco.
- Histórico e backup vêm de graça no Git.
- Curtidas e comentários não precisam que os textos estejam no banco: ligam-se ao texto pelo slug.

## Consequências

- Publicar um texto novo passa por um commit. Ordem: primeiro no site, depois no Substack com "publicado originalmente em joaobaran.com".
- Na fase 2, as interações usam um banco (Neon ou Supabase, a decidir). Se um dia for preciso escrever pelo navegador, um script migra os arquivos para o banco.
