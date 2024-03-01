import UserDB from "../model/DAOs/app.daos";
import { Request, Response, NextFunction } from "express";
import { HTTP_STATUS } from "../constants/api.constants";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.libs";
import mongoose from "mongoose";
import { CustomRequest, UserDocument } from "../utils/types.utils";
import { createUserResponse } from "../utils/createrUserResponse.utils";
import { validationRegister } from "../utils/valdationsRegister.utils";

const dataUser = UserDB.getUserDB();

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const { firstName, lastName, email, password, address, dateOfBirth, phoneNumber } = req.body;
            const validationErrors = await validationRegister(req.body);

            if (validationErrors !== null) {
                return res.status(HTTP_STATUS.BAD_REQUEST).json({ errors: validationErrors });
            }

            const passwordHash = await bcrypt.hash(password, 10);
            const newUser = await dataUser.register({
                firstName,
                lastName,
                email,
                password: passwordHash,
                address,
                dateOfBirth,
                phoneNumber
            });

            const payload = { id: newUser._id as mongoose.Types.ObjectId };
            const token = await createAccessToken(payload);

            res.cookie('token', token);
            res.status(HTTP_STATUS.CREATED).json(createUserResponse(newUser));

        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Error sign up'
            });
            return next(error);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        const { email, password } = req.body;
        try {
            const userFound: UserDocument | null = await dataUser.login(email);

            if (!userFound) {
                res.status(HTTP_STATUS.NOT_FOUND).json('User not found');
                return;
            }
            const isPasswordValid = await bcrypt.compare(password, userFound.password);
            if (!isPasswordValid) {
                res.status(HTTP_STATUS.UNAUTHORIZED).json('Invalid password');
                return;
            }
            const payload = { id: userFound._id as mongoose.Types.ObjectId };
            const token = await createAccessToken(payload);
            res.cookie("token", token);
            res.status(HTTP_STATUS.OK).json(createUserResponse(userFound));

        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Login Error'
            });
            return next(error);
        }
    }

    async logout(_req: Request, res: Response, next: NextFunction) {
        try {
            res.cookie('token', '', {
                expires: new Date(0)
            });
            return res.sendStatus(HTTP_STATUS.OK);
        } catch (error) {
            res.status(HTTP_STATUS.INTERNAL_ERROR).json({
                error: 'Logout error'
            });
            return next(error);
        }
    };

    async profile(req: CustomRequest, res: Response, next: NextFunction) {
        try {
            // Verificar si req.user existe y contiene el id
            const userId = req.user?.payload?.id;
            if (!userId) {
                return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: 'Unauthorized' });
            }

            const userFound: UserDocument | null = await dataUser.userById(userId);

            if (!userFound) {
                return res.status(HTTP_STATUS.NOT_FOUND).json({ message: 'User not found' });
            }

            return res.status(HTTP_STATUS.OK).json(createUserResponse(userFound));
        } catch (error) {
            return next(error);
        }
    }
}

export default new AuthController();
