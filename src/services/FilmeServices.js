const Filme = require('../model/Filme');

class FilmeService {
  constructor() {
    this.filme = Filme;
  }

  async adicionarFilme(
    titulo,
    sinopse,
    duracao,
    genero,
    anoLancamento,
    diretor,
    dataAdicionado
  ) {
    await this.filme.create({
      titulo,
      sinopse,
      duracao: parseInt(duracao),
      genero,
      anoLancamento: parseInt(anoLancamento),
      diretor,
      dataAdicionado,
    });
    return 'Filme adicionado com sucesso!';
  }

  async listarFilmes() {
    const filmes = await this.filme.findAll();
    if (filmes.length === 0) {
      return 'Não há filmes para exibir.';
    }
    const filmesLista = [];
    filmesLista.push(
      'Id | Título | Duração | Gênero | Ano de Lançamento | Sinopse | Diretor'
    );
    filmes.forEach((filme) => {
      filmesLista.push(
        `${filme.id} | ${filme.titulo} | ${filme.duracao} | ${filme.genero} | ${filme.anoLancamento} | ${filme.sinopse} | ${filme.diretor}`
      );
    });
    return filmesLista;
  }

  async buscarFilmePorId(id) {
    const filme = await this.filme.findByPk(id);
    if (!filme) {
      return 'Filme não encontrado.';
    }
    return `${filme.id} | ${filme.titulo} | ${filme.duracao} | ${filme.genero} | ${filme.anoLancamento} | ${filme.sinopse} | ${filme.diretor} \n`;
  }

  async atualizarFilme(id, campo, novoValor) {
    if (
      (campo == 'titulo' ||
        campo == 'duracao' ||
        campo == 'ano de lancamento') &&
      novoValor == ''
    ) {
      return 'Os campos título, duração e ano de lançamento são obrigatórios.';
    }
    if (campo == 'ano de lancamento') {
      campo = 'anoLancamento';
    }
    const dadosAtualizados = {};
    dadosAtualizados[campo] = novoValor;
    await this.filme.update(dadosAtualizados, {
      where: {
        id,
      },
    });
    return `Filme ${id} atualizado com sucesso!`;
  }

  async deletarFilme(id) {
    const filmeDeletado = await this.filme.destroy({
      where: { id },
    });
    if (filmeDeletado === 0) {
      return 'Filme não encontrado.';
    }
    return 'Filme deletado com sucesso!';
  }
}

module.exports = FilmeService;
