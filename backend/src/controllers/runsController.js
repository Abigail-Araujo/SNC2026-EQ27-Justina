import * as runService from '../services/runsService.js';
class RunsController {
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
}

export default RunsController;