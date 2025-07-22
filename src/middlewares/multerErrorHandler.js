import { MulterError } from 'multer';

// Middleware de erro pro Multer, tem que ter 4 params pra ser reconhecido pelo Express
export default (err, req, res, next) => {
  if (err instanceof MulterError) { // se for erro do Multer, responde com 400 e mensagem
    return res.status(400).json({ error: ['upload failed', err.code] });
  }
  return next(err); // se não for, passa pra próximo handler de erro tratar
};
