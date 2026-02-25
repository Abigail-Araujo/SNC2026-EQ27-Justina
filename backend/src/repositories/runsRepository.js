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

export const updateRun = async (id, data) => {
  const { rows } = await query(
    `UPDATE runs
     SET status = COALESCE($2, status),
         ended_at = COALESCE($3, ended_at),
         seed = COALESCE($4, seed),
         config = COALESCE($5, config)
     WHERE id = $1
     RETURNING *`,
    [id, data.status, data.ended_at, data.seed, data.config]
  );

  return rows[0];
};

export const deleteRun = async (id) => {
  const { rows } = await query('DELETE FROM runs WHERE id = $1 RETURNING id', [id]);
  return rows[0];
};
