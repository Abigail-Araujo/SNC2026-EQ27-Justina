import RunsMetricSummaryController from '../controllers/runMetricSummaryController.js';
import { Router } from 'express';
const router = Router();

// Rutas para resumen de métricas
router.post('/:id/summary', RunsMetricSummaryController.computeAndSaveSummary);
router.get('/:id/summary', RunsMetricSummaryController.getRunSummary);

export default router;