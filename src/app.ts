import express from 'express';
import router from './routes/app.routes';
import morgan from 'morgan';

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routers
app.use('/api', router);

export default app;