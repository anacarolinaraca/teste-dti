# Projeto - Gerenciamento de Filmes
Esse projeto é um teste técnico que consiste no desenvolvimento de um CRUD para gerenciamento de filmes, com um CRUD, utilizando:
- Node.js 
- SQLite como banco de dados
- Sequelize como ORM

Esta aplicação permite:
- Adicionar filmes
- Listar todos os filmes
- Buscar filme por ID
- Atualizar campos de um filme
- Deletar um filme

A interação é feita pelo terminal, utilizando a biblioteca `readline-sync`.

## 1. Tecnologias utilizadas
- Node.js v18.15.0
- SQLite
- Sequelize
- readline-sync
- Mocha, Chai, Sinon
- NYC

## 2. Recursos escolhidos
| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| titulo | String | Sim | Título do filme |
| duracao | Number | Sim | Duração do filme em minutos |
| anoLancamento | Number | Sim | 	Ano em que o filme foi lançado |
| sinopse | String | Não | Descrição do filme |
| genero | String | Não | Gênero do filme |
| diretor | String | Não | Nome do diretor do filme |
| dataAdicionado | Date | Sim | Data em que o filme foi adicionado ao sistema |

## 3. Como usar
Antes, verifique se o Node.js está instalado em sua máquina.
[Download Node.js](https://nodejs.org/en/download/)

3.1. Clone o repositório:
```
git clone git@github.com:anacarolinaraca/teste-dti.git
```
3.2. Acesse o diretório do projeto:
```
cd teste-dti
```
3.3. Utilize o comando para instalar as dependências:
```
npm install
```
3.4. Rode a aplicação utilizando:
```
npm run start
```
3.5. Rode o teste utilizando:
```
npm run test
```
3.6. Para ver a cobertura de teste:
```
npm run test:coverage
```
3.7. Executando a aplicação:
Após rodar o comando `npm run start`, será exibido um menu interativo no terminal com as opções disponíveis:
```
===============================
            Filmes
===============================
1 - Adicionar um filme
2 - Listar todos os filmes
3 - Buscar filme por Id
4 - Atualizar filme
5 - Deletar filme
0 - Sair
Digite o número da ação:
```
Escolha uma opção do menu e siga as instruções no terminal.
