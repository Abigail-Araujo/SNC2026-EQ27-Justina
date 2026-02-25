import { query } from '../config/db.js';

export const getAll = async () => {
  const { rows } = await query('SELECT * FROM procedures');
  return rows;
};

export const getProcedureById = async (id) => {
  const { rows } = await query('SELECT * FROM procedures WHERE id = $1', [id]);
  return rows[0];
};

export const createProcedure = async (procedure) => {
  const { rows } = await query(
    `INSERT INTO procedures
      (id, scenario_id, name, description, version)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [
      procedure.id,
      procedure.scenario_id,
      procedure.name,
      procedure.description,
      procedure.version
    ]
  );
  return rows[0];
};

export const updateProcedure = async (id, data) => {
  const { rows } = await query(
    `UPDATE procedures
     SET scenario_id = COALESCE($2, scenario_id),
         name = COALESCE($3, name),
         description = COALESCE($4, description),
         version = COALESCE($5, version)
     WHERE id = $1
     RETURNING *`,
    [id, data.scenario_id, data.name, data.description, data.version]
  );
  return rows[0];
};

export const deleteProcedure = async (id) => {
  const { rows } = await query('DELETE FROM procedures WHERE id = $1 RETURNING id', [id]);
  return rows[0];
};
