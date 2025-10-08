import React from "react";
import BalanceChecker from "./components/BalanceChecker.jsx";
//import TransactionChecker from "./components/TransactionChecker.jsx";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-4xl font-bold text-center mb-6">Blockchain Dashboard</h1>
      <BalanceChecker />
	  </div>
  );
}

