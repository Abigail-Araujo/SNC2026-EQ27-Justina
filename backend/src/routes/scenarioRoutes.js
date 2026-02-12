import ScenarioController from '../controllers/scenarioController.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();

// Rutas de escenarios
router.get('/', authenticate, ScenarioController.getAll);
router.get('/:id', authenticate, ScenarioController.getScenarioById);

export default router;