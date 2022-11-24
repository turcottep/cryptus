export default async function getNftsForUser(username: string) {
  try {
    const res = await fetch("/api/nfts/get_from_username", {
      method: "POST",
      body: JSON.stringify({ username: username }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Error updating nfts for user");
    }
    const nfts_db = await res.json();
    return nfts_db;
  } catch (e) {
    console.error("Erreur :", e);
    Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
