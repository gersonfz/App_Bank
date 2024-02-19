import { Router } from "express";
import UserController from '../../controller/auth.controller'

const router = Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout)
export default router;