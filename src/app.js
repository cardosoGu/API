import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';

// models
import './database/index';

// routes
import homeRouter from './routes/home';
import UserRouter from './routes/User';
import TokenRouter from './routes/token';
import alunoRouter from './routes/aluno';
import photoRouter from './routes/photo';

// middlewares
import multerErrorHandler from './middlewares/multerErrorHandler';
// apps/configs
dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', 'uploads')));

// routes
app.use('/user', UserRouter);
app.use('/', homeRouter);
app.use('/token', TokenRouter);
app.use('/aluno', alunoRouter);
app.use('/photo', photoRouter);

// middlewares
app.use(multerErrorHandler);

export default app;
