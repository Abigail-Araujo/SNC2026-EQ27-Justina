import 'dotenv/config';
import express from 'express';
import cors from 'cors';

// Importar rutas
import userRoutes from './routes/userRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Rutas MVC
app.use('/api/users', userRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});