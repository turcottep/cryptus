export default async function DeleteWalletWithCurrentAddress(
  wallet_address,
  addressToDelete,
  absolute = true
) {
  const base_url = absolute ? process.env.BASE_URL : "/";
  const res = await fetch(base_url + "api/users/deleteWalletToWallets", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentAddress: wallet_address,
      addressToAdd: addressToDelete,
    }),
  });
  const user = await res.json();
  return user;
}
