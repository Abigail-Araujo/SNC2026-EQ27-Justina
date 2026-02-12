import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
// Importar rutas
import userRoutes from './routes/userRoutes.js';
import scenarioRoutes from './routes/scenarioRoutes.js';
import runsRoutes from './routes/runsRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Rutas de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

// Rutas MVC
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/scenarios', scenarioRoutes);

app.use('/api/runs', runsRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});