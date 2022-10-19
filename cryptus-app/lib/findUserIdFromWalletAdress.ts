export default async function FindUserIdFromWalletAdress(
  wallet_address,
  absolute = true
) {
  try {
    const res = await fetch("/api/leads/walletaddress", {
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
