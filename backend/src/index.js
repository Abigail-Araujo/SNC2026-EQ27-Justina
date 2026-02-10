import express from 'express';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Rutas de la API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Servidor funcionando correctamente' });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});