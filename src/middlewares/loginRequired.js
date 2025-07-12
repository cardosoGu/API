import jwt from 'jsonwebtoken';
import User from '../models/user';

// validar token user q vem na header do navegado/verifica se user esta logado
export default async (req, res, next) => {
  const { authorization } = req.headers;
  // nao tem token autorizacao == deslogado
  if (!authorization) {
    return res.status(401).json({ error: ['login Required'] });
  }
  // separa 'bearer | token'
  const [texto, token] = authorization.split(' ');

  try {
    // verifica se token é valido
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // verifica se o usuario mudou o email, e ainda bate com o token
    const user = await User.findByPk(id);
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
