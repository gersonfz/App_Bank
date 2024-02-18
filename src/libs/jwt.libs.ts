import jwt from 'jsonwebtoken';
import { ENV_CONFIG_PROCES } from '../config';
import { Payload } from '../utils/types.utils';

export function createAccessToken(payload: Payload) {
    return new Promise ((resolve, reject) => {
        jwt.sign (payload,
        ENV_CONFIG_PROCES.JWT_SECRET,
        {
            expiresIn: '1h'
        },
        (error, token) => {
            if(error) reject(error);
            resolve(token);
        }
        );
    })
};