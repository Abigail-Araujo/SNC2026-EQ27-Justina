import AuthController from '../controllers/authController.js';
import { Router } from 'express';
import { validateLogin, validateRegister } from '../middlewares/validation.middleware.js';
const router = Router();

router.post('/change-password', AuthController.changePassword);
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

export default router;