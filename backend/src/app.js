import express from "express";
import authRoutes from "./routes/auth.js";
import balanceRoutes from "./routes/balance.js";
import cors from 'cors';

const app = express();

// 1️⃣ CORS must be first
app.use(cors({
  origin: (origin, callback) => {
    // allow requests from any localhost port (including Flutter Web)
    if (!origin || origin.startsWith('http://localhost')) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET','POST','OPTIONS'],
  credentials: true
}));

app.use(express.json());

app.use("/login", authRoutes);
app.use("/balance", balanceRoutes);

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

export default app;
