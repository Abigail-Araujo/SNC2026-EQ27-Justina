import { query } from '../config/db.js';


// Obtener todos los usuarios
export const getAll = async () => {
  const { rows } = await query('SELECT id, email, full_name, status, created_at, last_login_at FROM users');

  return rows;
}

// Obtener usuario por ID
export const getById = async (id) => {
  const { rows } = await query(
    `SELECT id, email, full_name, status, created_at, last_login_at
     FROM users
     WHERE id = $1`,
    [id]
  );
  return rows[0];
}

// Obtener usuario por email
export const getByEmail = async (email) => {
  const { rows } = await query('SELECT * FROM users WHERE email = $1', [email]);
  return rows[0];
}

// Crear usuario (usado por auth/register)
export const create = async ({ id, email, full_name, password_hash }) => {
  const { rows } = await query(
    `INSERT INTO users (id, email, full_name, password_hash)
     VALUES ($1, $2, $3, $4)
     RETURNING id, email, full_name, status, created_at`,
    [id, email, full_name, password_hash]
  );
  return rows[0];
}

// Actualizar usuario
export const update = async (id, { email, full_name, status }) => {

  const { rows } = await query(`
      UPDATE users 
      SET email = COALESCE($2, email),
          full_name = COALESCE($3, full_name),
          status = COALESCE($4, status)
      WHERE id = $1
      RETURNING id, email, full_name, status, created_at, last_login_at
    `, [id, email, full_name, status]);
  return rows[0];
}

// Eliminar usuario
export const deleteUser = async (id) => {
  const { rows } = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
  return rows[0];
}

// Actualizar último login
export const updateLastLogin = async (id) => {
  await query('UPDATE users SET last_login_at = NOW() WHERE id = $1', [id]);
  return true;
}


// Desactivar usuario
export const deactivate = async (id) => {
  const { rows } = await query(`
      UPDATE users 
      SET status = 'inactive'
      WHERE id = $1
      RETURNING id, email, full_name, status, created_at, last_login_at
    `, [id]);
  return rows[0];
}

// Cambiar contraseña
export const updatePasswordHash = async (id, password_hash) => {
  const { rows } = await query(
    `UPDATE users
     SET password_hash = $2
     WHERE id = $1
     RETURNING id`,
    [id, password_hash]
  );

  return rows[0];
};
