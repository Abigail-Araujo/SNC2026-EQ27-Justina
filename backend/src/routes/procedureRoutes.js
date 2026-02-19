import ProcedureController from '../controllers/procedureController.js';
import { Router } from 'express';
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', authenticate, ProcedureController.getAll);
router.get('/:id', authenticate, ProcedureController.getProcedureById);
router.post('/', authenticate, ProcedureController.create);
router.patch('/:id', authenticate, ProcedureController.update);
router.delete('/:id', authenticate, ProcedureController.delete);

export default router;
