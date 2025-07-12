import { Model, DataTypes } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        defaultValue: '',
      },

      sobrenome: {
        type: DataTypes.STRING,
        defaultValue: '',
      },

      email: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'email invalido!',
          },
        },
      },

      idade: {
        type: DataTypes.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: 'idade invalida',
          },
        },
      },

      peso: {
        type: DataTypes.FLOAT,
        defaultValue: '',
        validate: {
          isFloat: {
            msg: 'Peso invalido',
          },
        },
      },

      altura: {
        type: DataTypes.FLOAT,
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
}
