import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
// Importar middlewares
import { errorHandler } from './middlewares/errorHandler.middleware.js';
// Importar rutas
import authRoutes from './routes/authRoutes.js';
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


// Rutas MVC
app.use('/api/users', userRoutes);

app.use('/api/auth', authRoutes);

app.use('/api/scenarios', scenarioRoutes);

app.use('/api/runs', runsRoutes);

app.use('/api/runsmetricsummary', runMetricSummaryRoutes);

app.use('/api/procedures', procedureRoutes);

// Middleware de manejo de errores global (debe estar al final)
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});