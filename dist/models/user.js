"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class User extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize.DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 30],
              msg: 'Name must be between 3 and 30 characters',
            },
          },
        },
        email: {
          type: _sequelize.DataTypes.STRING,
          defaultValue: '',
          unique: {
            msg: 'Email already exists',
          },
          validate: {
            isEmail: {
              msg: 'Invalid email',
            },
          },
        },
        password_hash: {
          type: _sequelize.DataTypes.STRING,
          defaultValue: '',
        },
        password: {
          type: _sequelize.DataTypes.VIRTUAL,
          defaultValue: '',
          validate: {
            len: {
              args: [8, 16],
              msg: 'Password must be between 8 and 16 characters',
            },
          },
        },
      },
      {
        sequelize,
        tableName: 'Users',
        schema: 'escola',
      },
    );

    this.addHook('beforeSave', async (user) => {
      if (user.password) {
        user.password_hash = await _bcryptjs2.default.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Aluno, { foreignKey: 'user_id' });
  }
} exports.default = User;
