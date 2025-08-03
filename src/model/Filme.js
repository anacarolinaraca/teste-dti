const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/database');

class Filme extends Model {}
Filme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sinopse: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genero: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    anoLancamento: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    diretor: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    dataAdicionado: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Filme',
    underscored: true,
    timestamps: false,
  }
);

module.exports = Filme;
