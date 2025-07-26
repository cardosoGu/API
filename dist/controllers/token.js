"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);
var _isEmail = require('validator/lib/isEmail'); var _isEmail2 = _interopRequireDefault(_isEmail);
var _user = require('../models/user'); var _user2 = _interopRequireDefault(_user);

// log in / create session token for user
const store = async (req, res) => {
  const { email = '', password = '' } = req.body;

  if (!_isEmail2.default.call(void 0, email)) {
    return res.status(400).json({ errors: ['Invalid email'] });
  }

  if (!email || !password) {
    return res.status(401).json({ errors: ['Invalid information'] });
  }

  const user = await _user2.default.findOne({ where: { email } });
  if (!user) {
    return res.status(401).json({ errors: ['Incorrect Email'] });
  }

  if (!(await user.passwordIsValid(password))) {
    return res.status(401).json({ errors: ['Invalid password'] });
  }

  const { id, nome } = user;
  const token = _jsonwebtoken2.default.sign(
    { id, email },
    process.env.TOKEN_SECRET,
    { expiresIn: process.env.TOKEN_EXPIRATION },
  );

  return res.json({ token, user: { name: nome, id, email } });
};

exports. default = { store };
