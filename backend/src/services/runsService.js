import { randomUUID } from 'crypto';
import * as runRepository from '../repositories/runsRepository.js';
import * as scenarioRepository from '../repositories/scenarioRepository.js';

export const startRun = async (userId, scenarioId, seed, config) => {

  const scenario = await scenarioRepository.getScenarioById(scenarioId);
  if (!scenario || !scenario.is_active) {
    throw new Error('Scenario not available');
  }

  return await runRepository.createRun({
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
  const run = await runRepository.finishRun(runId);
  return run;
};

export const getRunsByUser = async (userId) => {
  return await runRepository.getRunsByUser(userId);
};

export const getAll = async () => {
  return await runRepository.getAll();
};

export const getById = async (runId) => {
  return await runRepository.getRunById(runId);
};

export const updateRun = async (runId, data) => {
  return await runRepository.updateRun(runId, data);
};

export const deleteRun = async (runId) => {
  return await runRepository.deleteRun(runId);
};

// cuando se complete un run, calcular métricas y guardarlas en la tabla de resumen y generar reporte