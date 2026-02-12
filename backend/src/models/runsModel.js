import { query } from '../config/db.js';

export const getAll = async () => {
    const { rows } = await query('SELECT * FROM runs');
    return rows;
};

export const getRunById = async (id) => {
    const { rows } = await query('SELECT * FROM runs WHERE id = $1', [id]);
    return rows[0];
};

export const createRun = async (run) => {
  const { rows } = await query(
    `INSERT INTO runs
     (id, scenario_id, user_id, status, started_at, seed, config)
     VALUES ($1, $2, $3, $4, $5, $6, $7)
     RETURNING *`,
    [
      run.id,
      run.scenario_id,
      run.user_id,
      run.status,
      run.started_at,
      run.seed,
      run.config
    ]
  );

  return rows[0];
};

export const getRunsByUser = async (userId) => {
  const { rows } = await query(
    `SELECT * FROM runs
     WHERE user_id = $1
     ORDER BY started_at DESC`,
    [userId]
  );

  return rows;
};

export const finishRun = async (id) => {
  const { rows } = await query(
    `UPDATE runs
     SET status = 'COMPLETED',
         ended_at = NOW()
     WHERE id = $1 AND status = 'IN_PROGRESS'
     RETURNING *`,
    [id]
  );

  return rows[0];
};