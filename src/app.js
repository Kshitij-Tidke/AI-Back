// app.js
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';
import morgan from 'morgan';
import dotenv from "dotenv"

dotenv.config()
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ['http://localhost:5173', process.env.API_URL],
    methods: ['GET', 'PUT', 'DELETE', 'POST'],
  })
);
app.use(morgan('dev'));

// Task Routes
app.use('/api/v1/task', taskRoutes);

// Error Handling Middleware (must be placed last)
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

export default app;
