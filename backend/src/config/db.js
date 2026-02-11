import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
  user: process.env.DB_USER ,
  password: process.env.DB_PASSWORD,
});

export const query = (text, params) => pool.query(text, params);

// Verificar conexión
// pool.on('connect', () => {
//   console.log('Conectado a PostgreSQL');
// });

// pool.on('error', (err) => {
//   console.error('Error en la conexión a PostgreSQL:', err);
//   process.exit(-1);
// });


