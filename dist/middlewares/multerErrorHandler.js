"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _multer = require('multer');

// Middleware de erro pro Multer, tem que ter 4 params pra ser reconhecido pelo Express
exports. default = (err, req, res, next) => {
  if (err instanceof _multer.MulterError) { // se for erro do Multer, responde com 400 e mensagem
    return res.status(400).json({ error: ['upload failed', err.code] });
  }
  return next(err); // se não for, passa pra próximo handler de erro tratar
};
