"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);
// create

const create = async (req, res) => {
  try {
    const novoUser = await _user2.default.create(req.body);
    const { id, nome, email } = novoUser;

    // cria token de login qnd criar a conta
    const token = _jsonwebtoken2.default.sign(
      { id, email },
      process.env.TOKEN_SECRET,
      { expiresIn: process.env.TOKEN_EXPIRATION },
    );

    return res.json({
      id, email, nome, token,
    });
  } catch (e) {
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
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
    return res.status(400).json({ errors: e.errors.map((err) => err.message) });
  }
};
// show
const show = async (req, res) => {
  try {
    const showUser = await _user2.default.findByPk(req.userId); // id - JWT
    if (!showUser) {
      return res.status(400).json({ errors: ['ID de usuario não encontrado'] });
    }
    const { id, nome, email } = showUser;
    return res.json({ id, nome, email });
  } catch (e) {
    return res.status(404).json({ errors: e.errors.map((err) => err.message) });
  }
};

// update

const update = async (req, res) => {
  try {
    const user = await _user2.default.findByPk(req.userId);
    if (!user) {
      return res.status(400).json({ errors: ['ID de usuario não encontrado'] });
    }

    const newUser = await user.update(req.body);

    return res.json(newUser);
  } catch (e) {
    return res.status(404).json({ errors: e.errors.map((err) => err.message) });
  }
};

// delete
const Delete = async (req, res) => {
  try {
    const user = await _user2.default.findByPk(req.params.id);
    if (!user) {
      return res.status(400).json({ errors: ['ID de usuario não encontrado'] });
    }
    await user.destroy();

    return res.json('Usuario deletado');
  } catch (e) {
    return res.status(404).json({ errors: e.errors.map((err) => err.message) });
  }
};

exports. default = {
  create, index, show, update, Delete,
};
