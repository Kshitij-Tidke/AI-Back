// app.js 
import express from "express";
import cors from "cors";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Task Routes
app.use("/api/v1/task", taskRoutes);

// Error Handling Middleware (must be placed last)
app.use(errorHandler);

app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
  });

export default app;
