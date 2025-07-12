"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);
var _path = require('path');

// models
require('./database/index');

// routes
var _home = require('./routes/home'); var _home2 = _interopRequireDefault(_home);
var _User = require('./routes/User'); var _User2 = _interopRequireDefault(_User);
var _token = require('./routes/token'); var _token2 = _interopRequireDefault(_token);
var _aluno = require('./routes/aluno'); var _aluno2 = _interopRequireDefault(_aluno);
var _photo = require('./routes/photo'); var _photo2 = _interopRequireDefault(_photo);

// middlewares
var _multerErrorHandler = require('./middlewares/multerErrorHandler'); var _multerErrorHandler2 = _interopRequireDefault(_multerErrorHandler);
// apps/configs
_dotenv2.default.config();

const app = _express2.default.call(void 0, );
app.use(_express2.default.urlencoded({ extended: true }));
app.use(_express2.default.json());
app.use(_express2.default.static(_path.resolve.call(void 0, __dirname, '..', 'uploads')));

// routes
app.use('/user', _User2.default);
app.use('/', _home2.default);
app.use('/token', _token2.default);
app.use('/aluno', _aluno2.default);
app.use('/photo', _photo2.default);

// middlewares
app.use(_multerErrorHandler2.default);

exports. default = app;
