import  {query } from '../config/db.js';

export const getAll = async () => {
    const { rows } = await query('SELECT * FROM scenarios');
    return rows;
};
export const getScenarioById = async (id) => {
    const { rows } = await query('SELECT * FROM scenarios WHERE id = $1', [id]);
    return rows[0];
}

export const createScenario = async (scenario) => {
  const { rows } = await query(
    `INSERT INTO scenarios
      (id, name, description, difficulty, expected_time_seconds, version, is_active)
     VALUES ($1, $2, $3, $4, $5, $6, COALESCE($7, TRUE))
     RETURNING *`,
    [
      scenario.id,
      scenario.name,
      scenario.description,
      scenario.difficulty,
      scenario.expected_time_seconds,
      scenario.version,
      scenario.is_active
    ]
  );
  return rows[0];
};

export const updateScenario = async (id, data) => {
  const { rows } = await query(
    `UPDATE scenarios
     SET name = COALESCE($2, name),
         description = COALESCE($3, description),
         difficulty = COALESCE($4, difficulty),
         expected_time_seconds = COALESCE($5, expected_time_seconds),
         version = COALESCE($6, version),
         is_active = COALESCE($7, is_active)
     WHERE id = $1
     RETURNING *`,
    [
      id,
      data.name,
      data.description,
      data.difficulty,
      data.expected_time_seconds,
      data.version,
      data.is_active
    ]
  );
  return rows[0];
};

export const deleteScenario = async (id) => {
  const { rows } = await query('DELETE FROM scenarios WHERE id = $1 RETURNING id', [id]);
  return rows[0];
};
