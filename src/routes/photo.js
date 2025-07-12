import { Router } from 'express';
import multer from 'multer';

import photoController from '../controllers/photo';
import multerConfig from '../config/multer';
import loginRequired from '../middlewares/loginRequired';

const router = Router();

// Configura multer com as regras do multerConfig
const upload = multer(multerConfig);

// Rota POST pra upload de foto
// upload.single('photo') é o middleware do multer que processa o upload do campo 'photo'
// caso erro upload, multer chama next(err), que deve ser tratado pelo middleware global de erro
router.post('/', loginRequired, upload.single('photo'), photoController.store);
router.put('/update', loginRequired, upload.single('photo'), photoController.update);
router.delete('/delete', loginRequired, upload.single('photo'), photoController.Delete);
export default router;
