import * as runService from '../services/runsService.js';
class RunsController {
    static async getRunById(req, res, next) {
        try {
            const run = await runService.getById(req.params.id);
            if (!run) {
                return res.status(404).json({ error: 'Run not found' });
            }
            res.json(run);
        } catch (err) {
            next(err);
        }
    }

    static async startRun(req, res, next) {
        try {
            const run = await runService.startRun(
                req.userId,
                req.body.scenarioId,
                req.body.seed,
                req.body.config
            );

            res.status(201).json(run);
        } catch (err) {
            next(err);
        }
    }

    static async finishRun(req, res, next) {
        try {
            const run = await runService.finishRun(req.params.id);
            if (!run) {
                return res.status(404).json({ error: 'Run not found or already completed' });
            }
            res.json(run);
        } catch (err) {
            next(err);
        }
    }
    static async getRunsByUser(req, res, next) {
        try {
            const runs = await runService.getRunsByUser(req.userId);
            res.json(runs);
        } catch (err) {
            next(err);
        }
    }
    static async getAll(req, res, next) {
        try {
            const runs = await runService.getAll();
            res.json(runs);
        } catch (err) {
            next(err);
        }
    }

    static async update(req, res, next) {
        try {
            const run = await runService.updateRun(req.params.id, req.body);
            if (!run) {
                return res.status(404).json({ error: 'Run no encontrada' });
            }
            res.json(run);
        } catch (err) {
            next(err);
        }
    }

    static async delete(req, res, next) {
        try {
            const deleted = await runService.deleteRun(req.params.id);
            if (!deleted) {
                return res.status(404).json({ error: 'Run no encontrada' });
            }
            res.json({ message: 'Run eliminada correctamente' });
        } catch (err) {
            next(err);
        }
    }
}

export default RunsController;
