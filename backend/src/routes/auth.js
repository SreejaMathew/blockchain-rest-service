import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { getUserByEmail } from "../services/index.js";

const router = express.Router();

// 🔹 Hardcoded secret for testing/demo
const SECRET_KEY = "mydemo_secret";

// POST /login
router.post("/", async (req, res) => {
  console.log("request from client")
  const { email, password } = req.body;
  const user = getUserByEmail(email);

  if (!user) return res.status(401).json({ error: "Invalid email" });

  const validPassword = await bcrypt.compare(password, user.password);
  console.log(validPassword);
  if (!validPassword) return res.status(401).json({ error: "Invalid password" });

  const token = jwt.sign({ email: user.email }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

export default router;
