const API_BASE = "http://35.225.175.89:3000"; // Replace with your VM IP

export async function getBalance(token) {
  const res = await fetch(`${API_BASE}/balance/${token}`);
  if (!res.ok) throw new Error("Failed to fetch balance");
  return await res.json();
}

export async function getTransactions(token) {
  const res = await fetch(`${API_BASE}/transactions/${token}`);
  if (!res.ok) throw new Error("Failed to fetch transactions");
  return await res.json();
}

