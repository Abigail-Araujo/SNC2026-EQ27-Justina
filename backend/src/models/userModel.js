import {pool} from '../config/db.js';


// Obtener todos los usuarios
export const getAll = async () => {
  const query = 'SELECT id, email, full_name, status, created_at, last_login_at FROM users ORDER BY created_at DESC';
  const { rows } = await pool.query(query);
  return rows;
}

// Obtener usuario por ID
export const getById = async (id) => {
  const query = 'SELECT id, email, full_name, status, created_at, last_login_at FROM users WHERE id = $1';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

// Obtener usuario por email
export const getByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE email = $1';
  const { rows } = await pool.query(query, [email]);
  return rows[0];
}

// Crear nuevo usuario
export const create = async ({ id, email, full_name, password_hash, status = 'active' }) => {
  const query = `
      INSERT INTO users (id, email, full_name, password_hash, status)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, email, full_name, status, created_at
    `;
  const { rows } = await pool.query(query, [id, email, full_name, password_hash, status]);
  return rows[0];
}

// Actualizar usuario
export const update = async (id, { email, full_name, status }) => {
  const query = `
      UPDATE users 
      SET email = COALESCE($2, email),
          full_name = COALESCE($3, full_name),
          status = COALESCE($4, status)
      WHERE id = $1
      RETURNING id, email, full_name, status, created_at, last_login_at
    `;
  const { rows } = await pool.query(query, [id, email, full_name, status]);
  return rows[0];
}

// Eliminar usuario
export const deleteUser = async (id) => {
  const query = 'DELETE FROM users WHERE id = $1 RETURNING id';
  const { rows } = await pool.query(query, [id]);
  return rows[0];
}

// Actualizar último login
export const updateLastLogin = async (id) => {
  const query = 'UPDATE users SET last_login_at = NOW() WHERE id = $1';
  await pool.query(query, [id]);
}



