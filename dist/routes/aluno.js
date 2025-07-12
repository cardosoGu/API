"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _aluno = require('../controllers/aluno'); var _aluno2 = _interopRequireDefault(_aluno);

var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );

router.get('/', _aluno2.default.index);
router.get('/:id', _aluno2.default.show);

router.post('/store', _aluno2.default.store);
router.put('/update/:id', _loginRequired2.default, _aluno2.default.update);
router.delete('/delete/:id', _loginRequired2.default, _aluno2.default.Delete);

exports. default = router;
