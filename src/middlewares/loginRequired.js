import jwt from 'jsonwebtoken';
import User from '../models/user';

// validate user token sent in header (check if user is logged in)
export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: ['Login required'] });
  }

  const [text, token] = authorization.split(' ');

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = data;

    const user = await User.findByPk(id);
    if (!user || user.email !== email) {
      return res.status(401).json({ error: ['Token expired or invalid'] });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch (e) {
    return res.status(401).json({ error: ['Token expired or invalid'] });
  }
};
