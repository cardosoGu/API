import { Router } from 'express';
import UserController from '../controllers/User';
import loginRequired from '../middlewares/loginRequired';

const router = Router();
// fechado por seguranca
// router.get('/', UserController.index);
router.get('/show', loginRequired, UserController.show);

router.post('/store', UserController.create);
router.put('/update', loginRequired, UserController.update);
router.delete('/delete/:id', loginRequired, UserController.Delete);

export default router;
