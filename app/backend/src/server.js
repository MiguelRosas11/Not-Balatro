import express from 'express';
import apiRoutes from './routes/apiRoutes.js';

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

app.use('/api', apiRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.listen(port, () => {
  console.log(`Not-Balatro API running on http://localhost:${port}`);
});
