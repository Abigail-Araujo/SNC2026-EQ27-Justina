import RunsController from '../controllers/runsController.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas para runs
router.post('/', authenticate, RunsController.startRun);
router.patch('/:id/finish', authenticate, RunsController.finishRun);
router.get('/me', authenticate, RunsController.getRunsByUser);
router.get('/', authenticate, RunsController.getAll);



export default router;