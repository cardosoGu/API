"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express');
var _User = require('../controllers/User'); var _User2 = _interopRequireDefault(_User);
var _loginRequired = require('../middlewares/loginRequired'); var _loginRequired2 = _interopRequireDefault(_loginRequired);

const router = _express.Router.call(void 0, );
// fechado por seguranca
// router.get('/', UserController.index);
router.get('/show', _loginRequired2.default, _User2.default.show);

router.post('/store', _User2.default.create);
router.put('/update', _loginRequired2.default, _User2.default.update);
router.delete('/delete/:id', _loginRequired2.default, _User2.default.Delete);

exports. default = router;
