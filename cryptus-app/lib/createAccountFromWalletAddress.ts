import get_base_url from "./get_base_url";

export default async function CreateAccountFromWalletAddress(
  wallet_address,
  absolute = true
) {
  const base_url = get_base_url();
  const res = await fetch(base_url + "/api/leads/createWalletFromAddress", {
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
    }),
  });
  const user = await res.json();
  return user;
}
