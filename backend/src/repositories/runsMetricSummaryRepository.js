

import { query } from "../config/db.js";

export const createRunMetricSummary = async (data) => {
  const queryText = `
    INSERT INTO run_metric_summary (
      run_id,
      total_time_seconds,
      errors_total,
      critical_errors,
      precision_score
    )
    VALUES ($1,$2,$3,$4,$5)
    ON CONFLICT (run_id) DO UPDATE SET
      total_time_seconds = EXCLUDED.total_time_seconds,
      errors_total = EXCLUDED.errors_total,
      critical_errors = EXCLUDED.critical_errors,
      precision_score = EXCLUDED.precision_score,
      computed_at = NOW()
  `;

  await query(queryText, [
    data.runId,
    data.totalTime,
    data.errorsTotal,
    data.criticalErrors,
    data.score
  ]);
};

export const getRunMetricSummary = async (runId) => {
  const queryText = `
    SELECT run_id, total_time_seconds, errors_total, critical_errors, precision_score, computed_at
    FROM run_metric_summary
    WHERE run_id = $1
  `;

  const { rows } = await query(queryText, [runId]);
  return rows[0];
};