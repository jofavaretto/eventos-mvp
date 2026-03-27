# Gerenciador de Eventos — Exercícios Resolvidos (com comentários)

Este pacote contém apenas a pasta `src/` (código do React) com os exercícios resolvidos e comentados.
Ele foi montado para encaixar na base que vocês já usam: Header/Menu/Footer + rotas `/`, `/evento`, `/cadastrar`.

## Como usar no projeto do aluno
1) Abra o projeto React (Vite/CRA) do aluno.
2) Substitua a pasta `src/` do projeto do aluno pela pasta `src/` deste ZIP.
3) Instale dependências (se necessário):
   - npm i
   - npm i react-router-dom@7.13.0
4) Rode:
   - npm run dev

## O que está resolvido
- Nível 1: descrição no cadastro + mostrar no card, limpar formulário, próximo evento na Home
- Nível 2: busca por título, filtro por local, remover todos
- Nível 3: detalhe `/evento/:id`, editar (preenche cadastro), badge aberto/lotado
- Parte IV: fotos (URLs), mapa (embed), capacidade/vagas e checkout `/evento/:id/checkout`

## Dica do Google Maps (sem API key)
Use um link com `output=embed` (ex.: https://www.google.com/maps?q=Chapec%C3%B3%20SC&output=embed).
