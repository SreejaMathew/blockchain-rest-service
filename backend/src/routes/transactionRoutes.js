import express from "express";
import BlockchainService from "../services/index.js";
import tokenMap from "../config/tokenMap.json" with { type: "json" };

const router = express.Router();

router.get("/:token", async (req, res) => {
  try {
    const token = req.params.token;
    const tokenInfo = tokenMap[token];

    if (!tokenInfo) return res.status(404).json({ error: "Token not found" });

    const transactions = await BlockchainService.getTransactions(token);

    res.json({
      token,
      transactions,
      chain: tokenInfo.chain,
      instance: tokenInfo.network, // show which instance
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

