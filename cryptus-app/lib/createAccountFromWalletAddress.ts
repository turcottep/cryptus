export default async function CreateAccountFromWalletAddress(
  wallet_address,
  absolute = true,
  username = String(Date.now())
) {
  const res = await fetch("/api/leads/createWalletFromAddress", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      address: wallet_address,
      external_url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        wallet_address +
        "&order_direction=asc&offset=0&limit=50",
      blockchain_id: "ETH",
      username: username,
    }),
  });
  const user = await res.json();
  return user;
}
