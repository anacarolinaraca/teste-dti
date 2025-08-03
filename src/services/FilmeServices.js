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
    return [
      console.log(
        'Id | Título | Duração | Gênero | Ano de Lançamento | Sinopse | Diretor \n'
      ),
      filmes.forEach((filme) => {
        console.log(
          `${filme.id} | ${filme.titulo} | ${filme.duracao} | ${filme.genero} | ${filme.anoLancamento} | ${filme.sinopse} | ${filme.diretor} \n`
        );
      }),
    ];
  }

  async buscarFilmePorId(id) {
    const filme = await this.filme.findByPk(id);
    if (!filme) {
      return 'Não há filmes para exibir.';
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
    await this.filme.destroy({
      where: { id },
    });
    return 'Filme deletado com sucesso!';
  }
}

module.exports = FilmeService;
