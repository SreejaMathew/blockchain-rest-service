import fetch from "node-fetch";

export async function getSolanaBalance(pubKey, rpcUrl) {
  const payload = { jsonrpc: "2.0", id: 1, method: "getBalance", params: [pubKey] };

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  return data.result ? data.result.value / 1e9 : 0;
}

export async function getSolanaTransactions(pubKey, rpcUrl) {
  const payload = {
    jsonrpc: "2.0",
    id: 1,
    method: "getSignaturesForAddress",
    params: [pubKey, { limit: 10 }]
  };

  const res = await fetch(rpcUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  });

  const data = await res.json();
  if (data.error) throw new Error(data.error.message);

  return data.result || [];
}

