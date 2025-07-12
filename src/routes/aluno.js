import { Router } from 'express';
import alunoController from '../controllers/aluno';

import loginRequired from '../middlewares/loginRequired';

const router = Router();

router.get('/', alunoController.index);
router.get('/:id', alunoController.show);

router.post('/store', alunoController.store);
router.put('/update/:id', loginRequired, alunoController.update);
router.delete('/delete/:id', loginRequired, alunoController.Delete);

export default router;
