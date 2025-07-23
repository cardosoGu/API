import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import User from '../models/user';

// logar/criar token de sessao ao user
const store = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ error: ['email invalido'] });
  }

  if (!email || !password) {
    return res.status(401).json({ errors: ['informacoes invalidas'] });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) { // usuario nao encontrado
    return res.status(401).json({ errors: ['Usuario nao encontrado'] });
  } // senha body == igual user do BD
  if (!(await user.passwordIsValid(password))) {
    return res.status(401).json({ errors: ['Senha invalida'] });
  }

  // user do BD já é instância de User/Model, por isso tem métodos sem precisar instanciar.

  const { id } = user; // pega id de user (destructuring)
  const token = jwt.sign( // criar token
    { id, email }, // payload = dados do user salvos no token pra identificar no login
    process.env.TOKEN_SECRET, // senha .env
    { expiresIn: process.env.TOKEN_EXPIRATION }, // duração .env
  );

  return res.json({ token, user: { nome: user.nome, id, email } });
};

export default { store };
