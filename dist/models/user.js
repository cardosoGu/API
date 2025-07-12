"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'Campo nome deve ter entre 3 e 30 caracteres',
          },
        },
      },
      email: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
        unique: {
          msg: 'Email já existe',
        },
        validate: {
          isEmail: {
            msg: 'Email inválido',
          },
        },
      },
      password_hash: {
        type: _sequelize.DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: _sequelize.DataTypes.VIRTUAL, // campo virtual, não salvo no banco
        defaultValue: '',
        validate: {
          len: {
            args: [8, 16], // senha deve ter no mínimo 6 caracteres
            msg: 'Senha deve ter entre 8 e 16 caracteres',
          },
        },
      },
    }, {
      sequelize,
      tableName: 'Users',
      schema: 'escola',
    });

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(Password) {
    return _bcryptjs2.default.compare(Password, this.password_hash);
  }
} exports.default = User;
