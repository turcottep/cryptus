export default async function FindUserFromUserId(id, withWallets, absolute = true) {
    const base_url = absolute ? process.env.BASE_URL : '/'
    try {
      const res = await fetch(base_url + "api/users/id", {
        method: "POST",
        body: JSON.stringify({ 
          id: id,
          withWallets: withWallets
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }); 
      const user = await res.json();
      return user
    } catch (e) {
      console.error("Erreur :", e);
      // Promise.reject(new Error("Unable to connect to server"));
      return null;
    }
  }