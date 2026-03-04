import RunsController from '../controllers/runsController.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

// Rutas para runs
router.post('/', authenticate, RunsController.startRun);
router.patch('/:id/finish', authenticate, RunsController.finishRun);
router.get('/:id/report', authenticate, RunsController.getRunReport);
router.get('/me', authenticate, RunsController.getRunsByUser);
router.get('/', authenticate, RunsController.getAll);
router.get('/:id', authenticate, RunsController.getRunById);
router.patch('/:id', authenticate, RunsController.update);
router.delete('/:id', authenticate, RunsController.delete);



export default router;
