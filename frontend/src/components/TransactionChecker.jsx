import { useState } from "react";
import { getTransactions } from "../services/api";

export default function TransactionChecker() {
  const [token, setToken] = useState("");
  const [txData, setTxData] = useState([]);
  const [error, setError] = useState("");

  const handleCheck = async () => {
    setError("");
    try {
      const data = await getTransactions(token.trim());
      setTxData(data.transactions || []);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-full max-w-md mx-auto mt-6">
      <h2 className="text-2xl font-bold mb-4">Transaction Checker</h2>
      <input
        type="text"
        placeholder="Enter public key"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      />
      <button
        onClick={handleCheck}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Check Transactions
      </button>

      {error && <p className="mt-4 text-red-600">{error}</p>}

      {txData.length > 0 && (
        <div className="mt-4 p-4 bg-gray-100 rounded max-h-64 overflow-y-auto">
          {txData.map((tx, idx) => (
            <div key={idx} className="mb-2 border-b pb-2">
              <p><strong>ID:</strong> {tx.id}</p>
              <p><strong>Type:</strong> {tx.type}</p>
              <p><strong>Amount:</strong> {tx.amount}</p>
              <p><strong>Date:</strong> {tx.date}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

