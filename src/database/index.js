import { Sequelize } from 'sequelize';
import dbconfig from '../config/database';
import Aluno from '../models/aluno';
import User from '../models/user';
import foto from '../models/foto';

const connection = new Sequelize(dbconfig);

const models = [Aluno, User, foto];

connection.authenticate()
  .then(() => console.log('Banco conectado'))
  .catch((e) => console.log('Falha ao conectar no banco', e));

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));
// se existir esse metodo em algum, ele executa e passa o BD a funcao
