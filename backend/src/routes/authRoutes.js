import AuthController from '../controllers/authController.js';
import { Router } from 'express';
import { validateLogin, validateRegister } from '../middlewares/validation.middleware.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();

router.post('/change-password', authenticate, AuthController.changePassword);
router.post('/register', validateRegister, AuthController.register);
router.post('/login', validateLogin, AuthController.login);

export default router;
