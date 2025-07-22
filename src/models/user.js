import { Model, DataTypes } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: DataTypes.STRING,
          defaultValue: '',
          validate: {
            len: {
              args: [3, 30],
              msg: 'Name must be between 3 and 30 characters',
            },
          },
        },
        email: {
          type: DataTypes.STRING,
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
          type: DataTypes.STRING,
          defaultValue: '',
        },
        password: {
          type: DataTypes.VIRTUAL,
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
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}
