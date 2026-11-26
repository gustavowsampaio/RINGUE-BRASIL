# Ringue Brasil

Projeto acadêmico sobre luta livre, desenvolvido a partir da estrutura do Web Data Viz da SPTech.

## Organização

- `public/`: páginas do site, CSS, JavaScript e imagens.
- `dashboard/`: painel de gráficos e comentários das avaliações.
- `src/routes/`: endereços da API de usuários e avaliações.
- `src/controllers/`: validação e tratamento das requisições.
- `src/models/`: consultas e cadastros no banco de dados.
- `src/database/`: conexão com o banco e script das tabelas.
- `app.js`: configuração e inicialização do servidor.
- `arquivos-nao-utilizados/`: exemplos antigos, separados para consulta.

## Executar localmente

1. Instale as dependências com `npm install`.
2. Crie o banco usando `src/database/script-tabelas.sql`.
3. Configure a conexão e a porta do servidor no `.env.dev`.
4. Execute `npm start` e abra o endereço informado no terminal.

## Fluxo das avaliações

A página Conte para nós envia a avaliação à rota `/avaliacoes/cadastrar`. A rota chama o controller, que valida os dados e utiliza o model para salvar no banco.

A dashboard consulta `/avaliacoes/resumo` e `/avaliacoes/comentarios` a cada cinco segundos para mostrar os indicadores, gráficos e comentários.

O login e o perfil continuam guardados no sessionStorage do navegador, conforme a proposta acadêmica do projeto.

## Material original

As instruções do Web Data Viz estão preservadas em `arquivos-nao-utilizados/README-web-data-viz.md`. A licença original permanece no arquivo `LICENSE`.
