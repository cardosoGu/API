"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

// logar/criar token de sessao ao user
const store = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!email || !password) {
    return res.status(401).json({ errors: ['informacoes invalidas'] });
  }

  const user = await _user2.default.findOne({ where: { email } });
  if (!user) { // usuario nao encontrado
    return res.status(401).json({ errors: ['Usuario nao encontrado'] });
  } // senha body == igual user do BD
  if (!(await user.passwordIsValid(password))) {
    return res.status(401).json({ errors: ['Senha invalida'] });
  }

  // user do BD já é instância de User/Model, por isso tem métodos sem precisar instanciar.

  const { id } = user; // pega id de user (destructuring)
  const token = _jsonwebtoken2.default.sign( // criar token
    { id, email }, // payload = dados do user salvos no token pra identificar no login
    process.env.TOKEN_SECRET, // senha .env
    { expiresIn: process.env.TOKEN_EXPIRATION }, // duração .env
  );

  return res.json({ token, user: { nome: user.nome, id, email } });
};

exports. default = { store };
