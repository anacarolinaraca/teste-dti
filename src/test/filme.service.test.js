const chai = require('chai');
const sinon = require('sinon');
const FilmeService = require('../services/FilmeServices.js');
const Filme = require('../model/Filme.js');

const expect = chai.expect;

describe('FilmeService', () => {
  let service;
  let stubCreate, stubFindAll, stubFindByPk, stubUpdate, stubDestroy;

  beforeEach(() => {
    service = new FilmeService();
    stubCreate = sinon.stub(Filme, 'create');
    stubFindAll = sinon.stub(Filme, 'findAll');
    stubFindByPk = sinon.stub(Filme, 'findByPk');
    stubUpdate = sinon.stub(Filme, 'update');
    stubDestroy = sinon.stub(Filme, 'destroy');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('adicionarFilme', () => {
    it('deve adicionar um novo filme e retornar mensagem de sucesso', async () => {
      stubCreate.resolves();

      const retorno = await service.adicionarFilme(
        'As branquelas',
        'Dois irmãos agentes do FBI, Marcus e Kevin Copeland, acidentalmente evitam que bandidos sejam presos em uma apreensão de drogas. Como castigo, eles são forçados a escoltar um par de socialites nos Hamptons. Quando as meninas descobrem o plano da agência, elas se recusam a ir. Sem opções, Marcus e Kevin, dois homens negros, decidem fingir que são as irmãs e se transformam em um par de loiras.',
        '109',
        'Comédia',
        '2004',
        'Keenen Ivory Wayans',
        '2025-08-02'
      );

      expect(retorno).to.equal('Filme adicionado com sucesso!');
      expect(stubCreate.calledOnce).to.be.true;
      expect(stubCreate.firstCall.args[0]).to.include({
        titulo: 'As branquelas',
        sinopse:
          'Dois irmãos agentes do FBI, Marcus e Kevin Copeland, acidentalmente evitam que bandidos sejam presos em uma apreensão de drogas. Como castigo, eles são forçados a escoltar um par de socialites nos Hamptons. Quando as meninas descobrem o plano da agência, elas se recusam a ir. Sem opções, Marcus e Kevin, dois homens negros, decidem fingir que são as irmãs e se transformam em um par de loiras.',
        duracao: 109,
        genero: 'Comédia',
        anoLancamento: 2004,
        diretor: 'Keenen Ivory Wayans',
        dataAdicionado: '2025-08-02',
      });
    });
  });

  describe('listarFilmes', () => {
    it('deve retornar mensagem se não houver filmes', async () => {
      stubFindAll.resolves([]);

      const listaVazia = await service.listarFilmes();
      expect(listaVazia).to.equal('Não há filmes para exibir.');
    });

    it('deve exibir filmes se existirem', async () => {
      const consoleStub = sinon.stub(console, 'log');

      const filmesMock = [
        {
          id: 1,
          titulo: 'Os Vingadores',
          duracao: 143,
          genero: 'Ação',
          anoLancamento: 2012,
          sinopse:
            'Loki, o irmão de Thor, ganha acesso ao poder ilimitado do cubo cósmico ao roubá-lo de dentro das instalações da S.H.I.E.L.D. Nick Fury, o diretor desta agência internacional que mantém a paz, logo reúne os únicos super-heróis que serão capazes de defender a Terra de ameaças sem precedentes. Homem de Ferro, Capitão América, Hulk, Thor, Viúva Negra e Gavião Arqueiro formam o time dos sonhos de Fury, mas eles precisam aprender a colocar os egos de lado e agir como um grupo em prol da humanidade.',
          diretor: 'Joss Whedon',
        },
      ];

      stubFindAll.resolves(filmesMock);

      const listaFilme = await service.listarFilmes();

      expect(consoleStub.called).to.be.true;
      expect(listaFilme).to.be.an('array');

      consoleStub.restore();
    });
  });

  describe('buscarFilmePorId', () => {
    it('deve retornar mensagem se não encontrar filme', async () => {
      stubFindByPk.resolves(undefined);

      const naoEncontrado = await service.buscarFilmePorId(1);
      expect(naoEncontrado).to.equal('Não há filmes para exibir.');
    });

    it('deve retornar dados do filme se encontrado', async () => {
      const filme = {
        id: 1,
        titulo: 'John Wick 4: Baba Yaga',
        duracao: 169,
        genero: 'Ação',
        anoLancamento: 2023,
        sinopse:
          'O ex-assassino de aluguel John Wick é procurado pelo mundo todo e a recompensa por sua captura aumenta cada vez mais. Wick descobre um caminho para derrotar a Alta Cúpula, mas antes de conquistar sua liberdade, ele precisa enfrentar um novo inimigo com alianças poderosas e forças que transformam velhos amigos em inimigos.',
        diretor: 'Chad Stahelski',
      };

      stubFindByPk.resolves(filme);

      const filmePorId = await service.buscarFilmePorId(1);
      expect(filmePorId).to.include('John Wick 4: Baba Yaga');
    });
  });

  describe('atualizarFilme', () => {
    it('deve validar campos obrigatórios', async () => {
      const campoObrigatorio = await service.atualizarFilme(1, 'titulo', '');
      expect(campoObrigatorio).to.equal(
        'Os campos título, duração e ano de lançamento são obrigatórios.'
      );
    });

    it('deve atualizar o campo corretamente', async () => {
      stubUpdate.resolves([1]);

      const mensagemSucesso = await service.atualizarFilme(
        1,
        'genero',
        'Comédia'
      );
      expect(mensagemSucesso).to.equal('Filme 1 atualizado com sucesso!');
      expect(stubUpdate.calledOnce).to.be.true;
    });

    it('deve transformar "ano de lancamento" em "anoLancamento"', async () => {
      stubUpdate.resolves([1]);

      await service.atualizarFilme(2, 'ano de lancamento', 2025);
      expect(stubUpdate.firstCall.args[0]).to.deep.equal({
        anoLancamento: 2025,
      });
    });
  });

  describe('deletarFilme', () => {
    it('deve deletar um filme e retornar mensagem de sucesso', async () => {
      stubDestroy.resolves(1);

      const mensagem = await service.deletarFilme(1);
      expect(mensagem).to.equal('Filme deletado com sucesso!');
      expect(stubDestroy.calledWith({ where: { id: 1 } })).to.be.true;
    });
  });
});
