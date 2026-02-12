import { randomUUID } from 'crypto';
import * as runModel from '../models/runsModel.js';
import { getScenarioById } from '../models/scenarioModel.js';

export const startRun = async (userId, scenarioId, seed, config) => {

  const scenario = await getScenarioById(scenarioId);
  if (!scenario || !scenario.is_active) {
    throw new Error('Scenario not available');
  }

  return await runModel.createRun({
    id: randomUUID(),
    scenario_id: scenarioId,
    user_id: userId,
    status: 'IN_PROGRESS',
    started_at: new Date(),
    seed,
    config
  });
};

export const finishRun = async (runId) => {
  const run = await runModel.finishRun(runId);
  return run;
};

export const getRunsByUser = async (userId) => {
  return await runModel.getRunsByUser(userId);
};

export const getAll = async () => {
  return await runModel.getAll();
};