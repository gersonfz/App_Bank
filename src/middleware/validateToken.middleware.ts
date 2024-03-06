import { NextFunction, Response } from "express";
import { HTTP_STATUS } from "../constants/api.constants";
import jwt, { JwtPayload, VerifyErrors, VerifyOptions } from 'jsonwebtoken';
import { ENV_CONFIG_PROCES } from "../config";
import { CustomRequest } from "../utils/types.utils";

export const authRequired = (req: CustomRequest, res: Response, next: NextFunction) => {
    const { token } = req.cookies;
    req.user = null;
    if (!token) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ message: "Not token, Unauthorized" });

    const options: VerifyOptions & { complete: true } = { complete: true };

    jwt.verify(
        token, 
        ENV_CONFIG_PROCES.JWT_SECRET, 
        options, 
        (err: VerifyErrors|null, user: JwtPayload | undefined) => {
            if(err) return res.status(HTTP_STATUS.UNAUTHORIZED).json({ messages: 'Invalid Token: Unauthorized' });
            req.user = user ?? null; // Asignar user a req.user, si user es undefined asignar null
            return next();
        }
    )
    return;
};