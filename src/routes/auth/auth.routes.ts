import { Router } from "express";
import AuthController from '../../controller/auth.controller'
import { authRequired } from "../../middleware/validateToken.middleware";

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/logout', AuthController.logout);
router.get('/profile', authRequired, AuthController.profile);

export default router;