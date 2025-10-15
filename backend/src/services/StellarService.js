import fetch from "node-fetch";

export async function getStellarBalance(token, rpc) {
  try {
    // rpc = "https://horizon-testnet.stellar.org"
    console.log("RPC URL:", rpc);
    console.log("Account Token:", token);

    // Assign fetch result to res
    const res = await fetch(`${rpc}/accounts/${token}`);

    if (!res.ok) {
      console.error("Failed to fetch account:", res.status, res.statusText);
      return 0;
    }

    const data = await res.json();
    const native = data.balances.find(b => b.asset_type === "native");
    console.log("Native balance:", native);
    return native ? Number(native.balance) : 0;

  } catch (err) {
    console.error("Stellar fetch error:", err);
    return 0;
  }
}
