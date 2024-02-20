import express from 'express';
import router from './routes/app.routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routers
app.use('/api', router);

export default app;