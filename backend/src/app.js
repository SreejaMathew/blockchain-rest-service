import cors from "cors";
import express from "express";
import bodyParser from "body-parser";
import balanceRoutes from "./routes/balance.js";
import transactionRoutes from "./routes/transactionRoutes.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Register routes
app.use("/balance", balanceRoutes);
app.use("/transaction", transactionRoutes);

export default app;

