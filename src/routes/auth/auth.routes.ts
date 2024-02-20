import { Router } from "express";
import UserController from '../../controller/auth.controller'
import { authRequired } from "../../middleware/validateToken.middleware";

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/profile', authRequired, UserController.profile);

export default router;