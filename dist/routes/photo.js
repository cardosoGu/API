"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);

var _photo = require('../controllers/photo'); var _photo2 = _interopRequireDefault(_photo);
var _multer3 = require('../config/multer'); var _multer4 = _interopRequireDefault(_multer3);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

// Configura multer com as regras do multerConfig
const upload = _multer2.default.call(void 0, _multer4.default);

// Rota POST pra upload de foto
// upload.single('photo') é o middleware do multer que processa o upload do campo 'photo'
// caso erro upload, multer chama next(err), que deve ser tratado pelo middleware global de erro
router.post('/', _loginRequired2.default, upload.single('photo'), _photo2.default.store);
router.put('/update', _loginRequired2.default, upload.single('photo'), _photo2.default.update);
router.delete('/delete', _loginRequired2.default, upload.single('photo'), _photo2.default.Delete);
exports. default = router;
