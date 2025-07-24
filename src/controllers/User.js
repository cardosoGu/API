import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/user';

// create
const create = async (req, res) => {
  try {
    const novoUser = await User.create(req.body);
    const { id, nome, email } = novoUser;

    const token = jwt.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({
      id, email, nome, token,
    });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

// index
const index = async (req, res) => {
  try {
    const showUsers = await User.findAll({
      attributes: ['id', 'nome', 'email'],
      order: [['id', 'DESC']],
    });

    return res.json(showUsers);
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

// show
const show = async (req, res) => {
  try {
    const showUser = await User.findByPk(req.userId);
    if (!showUser) {
      return res.status(400).json({ errors: ['User ID not found'] });
    }
    const { id, nome, email } = showUser;
    return res.json({ id, nome, email });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

// update
const update = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    const {
      nome, email, password, senhaAtual,
    } = req.body;
    if (!user) {
      return res.status(400).json({ errors: ['User ID not found'] });
    }
    if (password) {
      if (!senhaAtual) {
        return res.status(400).json({ errors: ['Current password is required to change password'] });
      }
      if (!bcrypt.compareSync(senhaAtual, user.password_hash)) {
        return res.status(400).json({ errors: ['Incorrect password'] });
      }
    }
    const data = { nome, email };
    // so envia o valor se o user enviar password
    if (password) data.password = password;
    const newUser = await user.update(data);

    return res.json({ nome, email });
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

// delete
const Delete = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ errors: ['User ID not found'] });
    }
    await user.destroy();

    return res.json('User deleted');
  } catch (e) {
    if (e.errors) {
      return res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
    return res.status(400).json({ errors: [e.message || 'Unknown error'] });
  }
};

export default {
  create, index, show, update, Delete,
};
