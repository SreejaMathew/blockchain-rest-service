import tokenMap from "../config/tokenMap.json" with { type: "json" };
import { getSolanaBalance, getSolanaTransactions } from "./SolanaService.js";
import { getStellarBalance, getStellarTransactions } from "./StellarService.js";

export default class BlockchainService {
  static async getBalance(pubKey) {
    const entry = tokenMap[pubKey];
    if (!entry) throw new Error("Unknown token");

    if (entry.blockchain === "solana") {
      const balance = await getSolanaBalance(pubKey, entry.rpc);
      return { balance, instance: entry.instance };
    }

    if (entry.blockchain === "stellar") {
      const balance = await getStellarBalance(pubKey, entry.rpc);
      return { balance, instance: entry.instance };
    }
  }

  static async getTransactions(pubKey) {
    const entry = tokenMap[pubKey];
    if (!entry) throw new Error("Unknown token");

    if (entry.blockchain === "solana") {
      const txs = await getSolanaTransactions(pubKey, entry.rpc);
      return { transactions: txs, instance: entry.instance };
    }

    if (entry.blockchain === "stellar") {
      const txs = await getStellarTransactions(pubKey, entry.rpc);
      return { transactions: txs, instance: entry.instance };
    }
  }
}

