import ScenarioController from '../controllers/scenarioController.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';
const router = Router();

// Rutas de escenarios
router.get('/', authenticate, ScenarioController.getAll);
router.get('/:id', authenticate, ScenarioController.getScenarioById);
router.post('/', authenticate, ScenarioController.create);
router.patch('/:id', authenticate, ScenarioController.update);
router.delete('/:id', authenticate, ScenarioController.delete);

export default router;
