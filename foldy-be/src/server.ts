import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './routes'; // Importa il router dall'index

// Carica variabili d'ambiente da .env
dotenv.config();

const app = express();

// Middleware di base
app.use(cors());
app.use(express.json());

// Rotta di test
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// Utilizza le routes sotto la rotta /api
app.use('/api', routes);

// Porta e avvio server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
