import React from "react";
import { useState } from "react";
import { getBalance } from "../services/api";

export default function BalanceChecker() {
  const [token, setToken] = useState("");
  const [balanceData, setBalanceData] = useState(null);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    try {
      const data = await getBalance(token.trim());
      setBalanceData(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Balance Checker</h2>
      <input
        type="text"
        placeholder="Enter public key"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleCheck}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Check Balance
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {balanceData && (
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <p><strong>Instance:</strong> {balanceData.instance}</p>
          <p><strong>Balance:</strong> {balanceData.balance}</p>
        </div>
      )}
    </div>
  );
}

