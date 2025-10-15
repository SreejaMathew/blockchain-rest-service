import fetch from "node-fetch";

/**
 * Safe fetch with timeout and detailed error handling
 */
async function safeFetch(url, body, timeoutMs = 5000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      console.error(`Fetch failed (${res.status}): ${res.statusText}`);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    clearTimeout(timeout);
    if (err.name === "AbortError") {
      console.error(`Timeout: ${url} not reachable`);
    } else {
      console.error(`Fetch error for ${url}: ${err.message}`);
    }
    return null;
  }
}

/**
 * Get Solana account balance.
 */
export async function getSolanaBalance(walletAddress, rpc) {
  const body = {
    jsonrpc: "2.0",
    id: 1,
    method: "getBalance",
    params: [walletAddress],
  };

  console.log(`Calling Solana RPC: ${rpc}`);
  console.log(`Wallet: ${walletAddress}`);

  const data = await safeFetch(rpc, body, 7000); // 7s timeout

  if (!data) {
    console.error(`No response from ${rpc}. Returning 0.`);
    return 0;
  }

  if (data.error) {
    console.error(`Solana RPC error: ${JSON.stringify(data.error)}`);
    return 0;
  }

  if (data.result && typeof data.result.value === "number") {
    console.log(data.result.value);
    const sol = data.result.value / 1_000_000_000; // convert lamports → SOL
    console.log(`Balance: ${sol} SOL`);
    return sol;
  }

  console.warn("Unexpected response:", data);
  return 0;
}
