const sequelize = require('../database/database');
const Filme = require('../model/Filme');
const FilmeService = require('../services/FilmeServices');
const readline = require('readline-sync');
class FilmeController {
  constructor() {
    this.filmeService = new FilmeService();
    this.filme = Filme;
  }
  async menu() {
    let opcao = '';
    while (opcao !== '0') {
      console.log('=================================');
      console.log('             Filmes');
      console.log('=================================');
      console.log('1 - Adicionar um filme');
      console.log('2 - Listar todos os filmes');
      console.log('3 - Buscar filme por Id');
      console.log('4 - Atualizar filme');
      console.log('5 - Deletar filme');
      console.log('0 - Sair');
      opcao = readline.question('Digite o número da ação: ');

      switch (opcao) {
        case '1':
          const addFilme = await this.adicionarFilme();
          console.log(addFilme);
          break;
        case '2':
          const listaFilmes = await this.listarFilmes();
          console.log(listaFilmes);
          break;
        case '3':
          const filmePorId = await this.buscarFilmePorId();
          console.log(filmePorId);
          break;
        case '4':
          const filmeAtualizado = await this.atualizarFilme();
          console.log(filmeAtualizado);
          break;
        case '5':
          const filmeDeletado = await this.deletarFilme();
          console.log(filmeDeletado);
          break;
        case '0':
          console.log('Saindo...');
          break;
        default:
          console.log('Opção inválida! Tente novamente.');
          break;
      }
    }
  }
  async adicionarFilme() {
    try {
      const titulo = readline.question('Título*: ');
      const sinopse = readline.question('Sinopse: ');
      const duracao = readline.question('Duração*: ');
      const genero = readline.question('Gênero: ');
      const anoLancamento = readline.question('Ano de lançamento*: ');
      const diretor = readline.question('Diretor: ');
      const dataAdicionado = new Date();
      if (titulo == '' || duracao == '' || anoLancamento == '') {
        return 'Os campos título, duração e ano de lançamento são obrigatórios.';
      }
      if (isNaN(duracao) || isNaN(anoLancamento)) {
        return 'A duração e o ano de lançamento devem ser números.';
      }
      const filmeAdicionado = await this.filmeService.adicionarFilme(
        titulo,
        sinopse,
        duracao,
        genero,
        anoLancamento,
        diretor,
        dataAdicionado
      );
      return filmeAdicionado;
    } catch (error) {
      console.log(`Erro ao adicionar filme: ${error.message}`);
    }
  }

  async listarFilmes() {
    try {
      const listaFilme = await this.filmeService.listarFilmes();
      return listaFilme;
    } catch (error) {
      console.log(`Erro ao listar filmes: ${error.message}`);
    }
  }

  async buscarFilmePorId() {
    try {
      const id = readline.question('Id do filme: ');
      const filme = await this.filmeService.buscarFilmePorId(id);
      return filme;
    } catch (error) {
      console.log(`Erro ao buscar filme: ${error.message}`);
    }
  }

  async atualizarFilme() {
    try {
      const id = readline.question('Id do filme: ');
      const filme = await this.filme.findByPk(id);
      if (!filme) {
        return 'Id não encontrado.';
      }
      const campos = [
        'titulo',
        'sinopse',
        'duracao',
        'genero',
        'ano de lancamento',
        'diretor',
      ];
      const campo = readline.question('Campo que deseja atualizar: ');
      const campoValido = campos.includes(campo.toLowerCase());
      if (!campoValido) {
        return 'Campo inválido.';
      }
      const novoValor = readline.question(`Digite o novo valor do ${campo}: `);
      const mensagem = await this.filmeService.atualizarFilme(
        id,
        campo,
        novoValor
      );
      return mensagem;
    } catch (error) {
      console.log(`Erro ao atualizar filme: ${error.message}`);
    }
  }

  async deletarFilme() {
    try {
      const id = readline.question('Id do filme: ');
      const mensagem = await this.filmeService.deletarFilme(id);
      return mensagem;
    } catch (error) {
      console.log(`Erro ao buscar filme: ${error.message}`);
    }
  }
}

module.exports = FilmeController;
