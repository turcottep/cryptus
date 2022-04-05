export default async function AddWalletWithCurrentAddress(
  wallet_address,
  addressToAdd,
  absolute = true
) {
  const base_url = absolute ? process.env.BASE_URL : "/";
  console.log(base_url);
  const res = await fetch(base_url + "api/users/addWalletToWallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentAddress: wallet_address,
      addressToAdd: addressToAdd,
      external_url:
        "https://api.opensea.io/api/v1/assets?owner=" +
        addressToAdd +
        "&order_direction=asc&offset=0&limit=50",
    }),
  });
  const user = await res.json();
  return user;
}
