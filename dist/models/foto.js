"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _appConfig = require('../config/appConfig'); var _appConfig2 = _interopRequireDefault(_appConfig);

 class foto extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      originalname: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio',
          },
        },
      },

      filename: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          notEmpty: {
            msg: 'Campo nao pode ficar vazio',
          },
        },
      },
      url: {
        type: _sequelize.DataTypes.VIRTUAL,
        get() {
          return `${_appConfig2.default.url}/images/${this.getDataValue('filename')}`;
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
} exports.default = foto;
