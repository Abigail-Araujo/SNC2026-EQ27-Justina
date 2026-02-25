import * as runRepository from "../repositories/runsRepository.js";
import * as runEventRepository from "../repositories/runsEventRepository.js";
import * as scenarioRepository from "../repositories/scenarioRepository.js";
import * as runMetricSummaryRepository from "../repositories/runsMetricSummaryRepository.js";

export const computeAndSaveSummary = async (runId) => {
  const run = await runRepository.getRunById(runId);
  const events = await runEventRepository.getRunEvents(runId);
  const scenario = await scenarioRepository.getScenarioById(run.scenario_id);

  const totalTime =
    (new Date(run.ended_at) - new Date(run.started_at)) / 1000;

  const errorsTotal = events.filter(
    e => ["error", "critical"].includes(e.severity)
  ).length;

  const criticalErrors = events.filter(
    e => e.severity === "critical"
  ).length;

  const timeScore =
    scenario.expected_time_seconds / totalTime;

  const penalty = errorsTotal * 0.05;

  const finalScore = Math.max(0, timeScore - penalty);

  await runMetricSummaryRepository.createRunMetricSummary({
    runId,
    totalTime,
    errorsTotal,
    criticalErrors,
    score: finalScore
  });
};

export const getRunSummary = async (runId) => {
  return await runMetricSummaryRepository.getRunMetricSummary(runId);

};

// validaciones que no tenga usuario que no tenga escenario, que el run exista, etc.