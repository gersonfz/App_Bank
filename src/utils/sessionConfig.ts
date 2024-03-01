import { SessionOptions } from 'express-session';
import { ENV_CONFIG_PROCES } from '../config';


const sessionConfig: SessionOptions = {
    secret: ENV_CONFIG_PROCES.SESSION_KEY,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 15 * 60 * 1000, // 15 minutos en milisegundos
        secure: false, // Cambia a true si estás utilizando HTTPS en producción
        httpOnly: true,
        sameSite: 'strict'
    }
};

export default sessionConfig;
