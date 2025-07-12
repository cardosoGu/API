import { Router } from 'express';
import tokenController from '../controllers/token';

const router = Router();

router.post('/store', tokenController.store);

export default router;
