// app.js
import express from "express";
import cors from "cors";

import balanceRoutes from "./routes/balance.js";
import transactionRoutes from "./routes/transactions.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/balance", balanceRoutes);
app.use("/transactions", transactionRoutes);

export default app;

