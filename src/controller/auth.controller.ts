    import User from "../model/DAOs/app.daos";
    import { Request, Response, NextFunction } from "express";
    import { HTTP_STATUS } from "../constants/api.constants";
    import bcrypt from 'bcryptjs';
    import { createAccessToken } from "../libs/jwt.libs";
    import mongoose from "mongoose";

    const dataUser = new User();

    class UserController {
        async register (req: Request, res: Response, next: NextFunction) {
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
                return next(error);;
            }
        }
        async login (_req: Request, _res: Response, next: NextFunction) {
            try {
                
            } catch (error) {
                next (error);
                return;
            }
        }
    };

    export default new UserController();