"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

// validar token user q vem na header do navegado/verifica se user esta logado
exports. default = async (req, res, next) => {
  const { authorization } = req.headers;
  // nao tem token autorizacao == deslogado
  if (!authorization) {
    return res.status(401).json({ error: ['login Required'] });
  }
  // separa 'bearer | token'
  const [texto, token] = authorization.split(' ');

  try {
    // verifica se token é valido
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // verifica se o usuario mudou o email, e ainda bate com o token
    const user = await _user2.default.findByPk(id);
    if (!user) {
      return res.status(401).json({ error: ['Token expirado ou invalido'] });
    }
    if (user.email !== email) {
      return res.status(401).json({ error: ['Token expirado ou invalido'] });
    }

    // se valido, pegar as info de payload e indentifica qm fez req
    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({ error: ['Token expirado ou invalido'] });
  }
};
