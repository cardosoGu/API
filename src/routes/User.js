import { Router } from 'express';
import UserController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = Router();
// nao precisa
router.get('/', UserController.index);
router.get('/show', loginRequired, UserController.show);

router.post('/store', UserController.create);
router.put('/update', loginRequired, UserController.update);
router.delete('/delete/:id', UserController.Delete);

export default router;
