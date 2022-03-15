import get_base_url from "./get_base_url";

export default async function FindUserIdFromWalletAdress(
  wallet_address,
  absolute = true
) {
  const base_url = get_base_url();
  try {
    const res = await fetch(base_url + "/api/leads/walletaddress", {
      method: "POST",
      body: JSON.stringify({ address: wallet_address }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const wallet = await res.json();
    return wallet.userId;
  } catch (e) {
    console.error("Erreur :", e);
    Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
