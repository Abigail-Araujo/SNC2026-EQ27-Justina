import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
// Importar rutas
import userRoutes from './routes/userRoutes.js';
import scenarioRoutes from './routes/scenarioRoutes.js';
import runsRoutes from './routes/runsRoutes.js';
import runMetricSummaryRoutes from './routes/runMetricSummaryRoutes.js';
import procedureRoutes from './routes/procedureRoutes.js';


const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
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

app.use('/api/runsmetricsummary', runMetricSummaryRoutes);

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  
  // Errores conocidos de autenticación/validación
  if (err.message === 'Invalid credentials' || err.message === 'Contraseña actual incorrecta') {
    return res.status(401).json({ error: err.message });
  }
  if (err.message === 'Email already registered') {
    return res.status(409).json({ error: err.message });
  }
  if (err.message === 'Usuario no encontrado') {
    return res.status(404).json({ error: err.message });
  }
  
  // Error genérico
  res.status(500).json({ error: 'Error interno del servidor' });
});
app.use('/api/procedures', procedureRoutes);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});