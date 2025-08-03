const chai = require('chai');
const sinon = require('sinon');
const readline = require('readline-sync');
const Filme = require('../model/Filme');
const FilmeController = require('../Controller/FilmeController.js');
const expect = chai.expect;

describe('FilmeController', () => {
  let controller;
  let serviceStub;

  beforeEach(() => {
    controller = new FilmeController();
    serviceStub = sinon.stub(controller.filmeService);
  });

  describe('adicionarFilme', () => {
    it('deve retornar erro se campos obrigatórios estiverem vazios', async () => {
      const question = sinon.stub(readline, 'question');
      question.onCall(0).returns('');
      question.onCall(1).returns('Sinopse');
      question.onCall(2).returns('');
      question.onCall(3).returns('Ação');
      question.onCall(4).returns('');
      question.onCall(5).returns('Diretor');

      const mensagem = await controller.adicionarFilme();
      expect(mensagem).to.equal(
        'Os campos título, duração e ano de lançamento são obrigatórios.'
      );
    });

    it('deve chamar filmeService.adicionarFilme com dados válidos', async () => {
      sinon
        .stub(readline, 'question')
        .onCall(0)
        .returns('MIB Homens de Preto Internacional')
        .onCall(1)
        .returns(
          'Alienígenas ameaçam a Terra! Então uma nova recruta e um agente veterano de MIB embarcam em uma missão para salvar a organização e o mundo.'
        )
        .onCall(2)
        .returns('114')
        .onCall(3)
        .returns('Ação')
        .onCall(4)
        .returns('2019')
        .onCall(5)
        .returns('F. Gary Gray');

      const mensagemSucesso = 'Filme adicionado com sucesso!';
      serviceStub.adicionarFilme.resolves(mensagemSucesso);

      const mensagem = await controller.adicionarFilme();

      expect(mensagem).to.equal(mensagemSucesso);
      expect(serviceStub.adicionarFilme.calledOnce).to.be.true;
    });
  });

  describe('listarFilmes', () => {
    it('deve retornar resultado da listagem de filmes', async () => {
      const filmesMock = ['As branquelas', 'Zerando a vida'];
      serviceStub.listarFilmes.resolves(filmesMock);

      const listaFilme = await controller.listarFilmes();
      expect(listaFilme).to.deep.equal(filmesMock);
    });
  });

  describe('buscarFilmePorId', () => {
    it('deve buscar filme pelo ID informado', async () => {
      sinon.stub(readline, 'question').returns('1');
      serviceStub.buscarFilmePorId.resolves('As branquelas');

      const filmePorId = await controller.buscarFilmePorId();
      expect(filmePorId).to.equal('As branquelas');
    });
  });

  describe('atualizarFilme', () => {
    it('deve retornar "Id não encontrado" se filme não existir', async () => {
      sinon.stub(readline, 'question').onFirstCall().returns('99');
      sinon.stub(Filme, 'findByPk').resolves(undefined);

      const naoEncontrado = await controller.atualizarFilme();
      expect(naoEncontrado).to.equal('Id não encontrado.');
    });

    it('deve retornar "Campo inválido" se campo não estiver na lista', async () => {
      sinon
        .stub(readline, 'question')
        .onCall(0)
        .returns('1')
        .onCall(1)
        .returns('classificação');

      sinon.stub(Filme, 'findByPk').resolves({ id: 1 });

      const mensagemCampo = await controller.atualizarFilme();
      expect(mensagemCampo).to.equal('Campo inválido.');
    });

    it('deve atualizar o campo do filme com sucesso', async () => {
      sinon
        .stub(readline, 'question')
        .onCall(0)
        .returns('1')
        .onCall(1)
        .returns('titulo')
        .onCall(2)
        .returns('O plano perfeito');

      sinon.stub(Filme, 'findByPk').resolves({ id: 1 });
      serviceStub.atualizarFilme.resolves('Filme atualizado');

      const mensagem = await controller.atualizarFilme();
      expect(mensagem).to.equal('Filme atualizado');
    });
  });

  describe('deletarFilme', () => {
    it('deve deletar filme com ID informado', async () => {
      sinon.stub(readline, 'question').returns('1');
      serviceStub.deletarFilme.resolves('Filme deletado com sucesso!');

      const mensagem = await controller.deletarFilme();
      expect(mensagem).to.equal('Filme deletado com sucesso!');
    });
  });

  afterEach(sinon.restore);
});
