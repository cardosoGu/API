"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
      },

      sobrenome: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
      },

      email: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'email invalido!',
          },
        },
      },

      idade: {
        type: _sequelize.DataTypes.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'idade invalida',
          },
        },
      },

      peso: {
        type: _sequelize.DataTypes.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Peso invalido',
          },
        },
      },

      altura: {
        type: _sequelize.DataTypes.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'altura invalida',
          },
        },
      },

    }, {
      sequelize,
      schema: 'escola',
      tableName: 'alunos',
    });
    return this;
  }

  static associate(model) {
    this.hasOne(model.foto, { foreignKey: 'aluno_id' });
  }
} exports.default = Aluno;
