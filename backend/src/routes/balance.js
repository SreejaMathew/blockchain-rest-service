import express from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import { getSolanaBalance, getStellarBalance } from "../services/index.js";

const router = express.Router();

// 🔹 Hardcoded secret for testing/demo
const SECRET_KEY = "mydemo_secret";

// Middleware to verify JWT
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Missing token" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// GET /balance
router.get("/", authenticateToken, async (req, res) => {
  const email = req.user.email;

  const userTokens = JSON.parse(fs.readFileSync("./backend/src/config/userTokens.json", "utf-8"));
  const tokenMap = JSON.parse(fs.readFileSync("./backend/src/config/tokenMap.json", "utf-8"));

  const tokens = userTokens[email];
  if (!tokens) return res.status(404).json({ error: "No tokens found for user" });

  const balances = {};
  for (const token of tokens) {
    const meta = tokenMap[token];
    console.log(meta);
    console.log(token);
    if (!meta) continue;

    if (meta.blockchain === "solana") {
      balances[token] = await getSolanaBalance(token, meta.rpc);
    } else if (meta.blockchain === "stellar") {
      balances[token] = await getStellarBalance(token, meta.rpc);
    }
  }

  res.json({ email, balances });
});

export default router;

//curl -X POST "http://localhost:3000/balance" -H "Content-Type: application/json" -d "{\"email\":\"user1@example.com\",\"password\":\"mypassword\"}"

//curl -X GET http://localhost:3000/balance -H "Authorization: Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzYwNDU3NjEwLCJleHAiOjE3NjA0NjEyMTB9.F-6iqScPUoXgshad8f-ECemTTdqtpor0NsjmfE1alGE"


//curl -X GET http://localhost:3000/balance -H "Authorization: Bearer "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InVzZXIxQGV4YW1wbGUuY29tIiwiaWF0IjoxNzYwNTAyMTkyLCJleHAiOjE3NjA1MDU3OTJ9.BMPumCqlKDY4GZ1GXRUY_VxEMyvJ-XjMubVyG8rx6VQ"

