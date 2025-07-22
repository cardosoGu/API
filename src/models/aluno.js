import { Model, DataTypes } from 'sequelize';

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
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
              msg: 'Invalid email',
            },
          },
        },

        idade: {
          type: DataTypes.INTEGER,
          defaultValue: '',
          validate: {
            isInt: {
              msg: 'Invalid age',
            },
          },
        },

        peso: {
          type: DataTypes.FLOAT,
          defaultValue: '',
          validate: {
            isFloat: {
              msg: 'Invalid weight',
            },
          },
        },

        altura: {
          type: DataTypes.FLOAT,
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
  }
}
