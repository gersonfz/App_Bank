import { Router } from "express";
import { authRequired } from "../../middleware/validateToken.middleware";


const userRouter = Router();

userRouter.put('/profile', authRequired);
userRouter.put('/password', authRequired);

export default userRouter;