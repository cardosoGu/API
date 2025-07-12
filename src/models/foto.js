import { Model, DataTypes } from 'sequelize';
import appConfig from '../config/appConfig';

export default class foto extends Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio',
          },
        },
      },

      filename: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio',
          },
        },
      },
      url: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${appConfig.url}/images/${this.getDataValue('filename')}`;
        },
      },
    }, {
      sequelize,
      schema: 'escola',
      tableName: 'foto',
    });
    return this;
  }

  static associate(models) { // esses dados pertencem ao aluno em q aluno_id é ligado
    this.belongsTo(models.Aluno, { foreignKey: 'aluno_id' });
  }
}
