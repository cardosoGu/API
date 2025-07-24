"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

// create
const create = async (req, res) => {
  try {
    const novoUser = await _user2.default.create(req.body);
    const { id, nome, email } = novoUser;

    const token = _jsonwebtoken2.default.sign(
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
    const showUsers = await _user2.default.findAll({
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
    const showUser = await _user2.default.findByPk(req.userId);
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
    const user = await _user2.default.findByPk(req.userId);
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
      if (!_bcryptjs2.default.compareSync(senhaAtual, user.password_hash)) {
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
    const user = await _user2.default.findByPk(req.params.id);
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

exports. default = {
  create, index, show, update, Delete,
};
