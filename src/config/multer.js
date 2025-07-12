import multer from 'multer';
import { extname, resolve } from 'path';

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  // Verifica se o arquivo é jpeg ou png
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
      return cb(new multer.MulterError('LIMIT_UNEXPECTED_FILE'));
    }
    return cb(null, true); // aceita o arquivo
  },

  storage: multer.diskStorage({
    // Pasta onde o arquivo vai ser salvo
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, '..', '..', 'uploads', 'images'));
    },

    // Renomeia o arquivo pra evitar conflito
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};
