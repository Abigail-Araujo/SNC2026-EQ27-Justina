import  {query } from '../config/db.js';

export const getAll = async () => {
    const { rows } = await query('SELECT * FROM scenarios');
    return rows;
};
export const getScenarioById = async (id) => {
    const { rows } = await query('SELECT * FROM scenarios WHERE id = $1', [id]);
    return rows[0];
}