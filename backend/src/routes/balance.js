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

  // Read user tokens and token map
  const userTokens = JSON.parse(
    fs.readFileSync("./backend/src/config/userTokens.json", "utf-8")
  );
  const tokenMap = JSON.parse(
    fs.readFileSync("./backend/src/config/tokenMap.json", "utf-8")
  );

  const tokens = userTokens[email];
  if (!tokens) return res.status(404).json({ error: "No tokens found for user" });

  const accounts = {};

  for (const token of tokens) {
    const meta = tokenMap[token];
    if (!meta) continue;

    let balance = 0;
    try {
      if (meta.blockchain === "solana") {
        balance = await getSolanaBalance(token, meta.rpc);
      } else if (meta.blockchain === "stellar") {
        balance = await getStellarBalance(token, meta.rpc);
      }
    } catch (err) {
      console.error(`Error fetching balance for ${token}:`, err);
      balance = 0;
    }

    // Add token to accounts in the requested format
    accounts[token] = {
      balance,
      rpc: meta.rpc || "",
      instance: meta.instance || "",
    };
  }

  // Return final JSON
  res.json({ email, accounts });
});

export default router;
