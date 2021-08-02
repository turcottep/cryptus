export default async function FindUserIdFromWalletAdress(wallet_address, absolute = true) {
  console.log("base_url=", process.env.BASE_URL);
  const base_url = absolute ? process.env.BASE_URL : '/'
  try {
    const res = await fetch(base_url + "api/leads/walletaddress", {
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
    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}