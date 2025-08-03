const sequelize = require('./database/database');
const FilmeController = require('./Controller/FilmeController');

class App {
  constructor() {
    this.filmeController = new FilmeController();
  }

  async init() {
    try {
      await sequelize.sync();
      await this.filmeController.menu();
    } catch (error) {
      console.error(`Erro ao iniciar: ${error}`);
    }
  }
}

new App().init();
