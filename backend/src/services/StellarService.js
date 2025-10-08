import fetch from "node-fetch";

export async function getStellarBalance(pubKey, rpcUrl) {
  const res = await fetch(`${rpcUrl}/accounts/${pubKey}`);
  if (!res.ok) throw new Error(`Stellar Horizon error: ${res.statusText}`);

  const data = await res.json();
  const nativeBalance = data.balances.find(b => b.asset_type === "native");
  return nativeBalance ? parseFloat(nativeBalance.balance) : 0;
}

export async function getStellarTransactions(pubKey, rpcUrl) {
  const res = await fetch(`${rpcUrl}/accounts/${pubKey}/transactions?limit=10&order=desc`);
  if (!res.ok) throw new Error(`Stellar Horizon error: ${res.statusText}`);

  const data = await res.json();
  return data._embedded.records || [];
}

