"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');

 class Aluno extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
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
              msg: 'Invalid email',
            },
          },
        },

        idade: {
          type: _sequelize.DataTypes.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Invalid age',
            },
          },
        },

        peso: {
          type: _sequelize.DataTypes.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Invalid weight',
            },
          },
        },

        altura: {
          type: _sequelize.DataTypes.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Invalid height',
            },
          },
        },
      },
      {
        sequelize,
        schema: 'escola',
        tableName: 'alunos',
      },
    );
    return this;
  }

  static associate(models) {
    this.hasOne(models.foto, { foreignKey: 'aluno_id' });
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }
} exports.default = Aluno;
