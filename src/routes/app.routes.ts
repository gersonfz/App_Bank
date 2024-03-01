import { Router } from "express";
import authRouter from './auth/auth.routes'
import userRouter from "./user/user.routes";
import financialRouter from "./transactions/transfer.routes";

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/financial', financialRouter)

export default router; 