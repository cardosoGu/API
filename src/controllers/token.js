import jwt from 'jsonwebtoken';
import isEmail from 'validator/lib/isEmail';
import User from '../models/user';

// log in / create session token for user
const store = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!isEmail(email)) {
    return res.status(400).json({ errors: ['Invalid email'] });
  }

  if (!email || !password) {
    return res.status(401).json({ errors: ['Invalid information'] });
  }

  const user = await User.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ errors: ['User not found'] });
  }

  if (!(await user.passwordIsValid(password))) {
    return res.status(401).json({ errors: ['Invalid password'] });
  }

  const { id, nome } = user;
  const token = jwt.sign(
    { id, email },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION },
  );

  return res.json({ token, user: { name: nome, id, email } });
};

export default { store };
