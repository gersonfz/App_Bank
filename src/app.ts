import express from 'express';
import router from './routes/app.routes';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import sessionConfig from './utils/sessionConfig';

const app = express();

//session
app.use(session(sessionConfig))

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//routers
app.use('/', router);

export default app;