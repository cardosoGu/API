import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: DataTypes.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'Campo nome deve ter entre 3 e 30 caracteres',
          },
        },
      },
      email: {
        type: DataTypes.STRING,
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
        type: DataTypes.STRING,
        defaultValue: '',
      },
      password: {
        type: DataTypes.VIRTUAL, // campo virtual, não salvo no banco
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
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(Password) {
    return bcrypt.compare(Password, this.password_hash);
  }
}
