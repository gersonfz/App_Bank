import User from "../model/DAOs/app.daos";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/api.constants";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.libs";
import mongoose from "mongoose";

const dataUser = new User();

class UserController {
    async register(req: Request, res: Response, next: NextFunction) {
        const { username, email, password } = req.body;

        try {
            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await dataUser.register({
                username,
                email,
                password: passwordHash,
            });
            const payload = { id: newUser._id as mongoose.Types.ObjectId };
            const token = await createAccessToken(payload);

            res.cookie('Token', token)
            res.
                status(HTTP_STATUS.CREATED).
                json({
                    id: newUser._id,
                    username: newUser.username,
                    email: newUser.email,
                    createdAt: newUser.createdAt,
                    updatedAt: newUser.updatedAt
                })

        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Ocurrio un error al registrar el usuario'
            });
            return next(error);
        }
    }


    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const userFound = await dataUser.login(email);

            if (!userFound) {
                res.status(HTTP_STATUS.NOT_FOUND).json('Usuario no encontrado');
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, userFound.password);
            if (!isPasswordValid) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json('Contraseña incorrecta');
                return;
            }
            const payload = { id: userFound._id as mongoose.Types.ObjectId };
            const token = await createAccessToken(payload);
            res.cookie("token", token)
            res.status(HTTP_STATUS.OK).
                json({
                    id: userFound._id,
                    username: userFound.username,
                    email: userFound.email,
                    createdAt: userFound.createdAt,
                    updatedAt: userFound.updatedAt
                })

        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Ocurrio un error al loguear el usuario'
            })
            return next(error);
        }
    }
    async logout(_req: Request, res: Response, next: NextFunction) {
        try {            
            res.cookie('token', '', {
                expires: new Date(0)
            });
            return res.sendStatus(HTTP_STATUS.OK)
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Ocurrio un error al cerrar sesion'
            })
            return next(error);
        }
    };
}

export default new UserController();