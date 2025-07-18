import express from 'express';
import dotenv from 'dotenv';
import { resolve } from 'path';
import helmet from 'helmet';
import cors from 'cors';

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

const whitelist = [
  'http://35.247.228.63:81',
  'http://localhost:3000',

];

const corsOptions = {
  origin(origin, callback) {
    if (whitelist.includes(origin) || origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by cors'));
    }
  },
};

// express/security
const app = express();
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve(__dirname, '..', 'uploads')));

// routes
app.use('/users', UserRouter);
app.use('/', homeRouter);
app.use('/token', TokenRouter);
app.use('/alunos', alunoRouter);
app.use('/photos', photoRouter);

// middlewares
app.use(multerErrorHandler);

export default app;
