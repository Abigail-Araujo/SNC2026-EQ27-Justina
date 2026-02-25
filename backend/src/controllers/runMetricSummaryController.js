import * as runMetricSummaryService from "../services/runsMetricSummaryService.js";

class RunMetricSummaryController {

    static async computeAndSaveSummary(req, res, next) {
        try {
            const runId = req.params.id;
            const summary = await runMetricSummaryService.computeAndSaveSummary(runId);
            res.json(summary);
        } catch (err) {
            next(err);
        }
    }

    static async getRunSummary(req, res, next) {
        try {
            const runId = req.params.id;
            const summary = await runMetricSummaryService.getRunSummary(runId);
            if (!summary) {
                return res.status(404).json({ error: 'Run summary not found' });
            }
            res.json(summary);
        } catch (err) {
            next(err);
        }
    }
}

export default RunMetricSummaryController;