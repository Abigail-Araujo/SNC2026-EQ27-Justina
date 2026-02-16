import { Router } from 'express';
import UserController from '../controllers/userController.js';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();

// Rutas de usuarios (solo lectura y actualización)
router.get('/', authenticate, UserController.getAll);
router.get('/:id', authenticate, UserController.getById);
// Nota: POST suprimido - usar POST /api/auth/register en su lugar
router.patch('/:id', authenticate, UserController.update);
router.delete('/:id', authenticate, UserController.delete);

export default router;
