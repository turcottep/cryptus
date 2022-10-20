export default async function FindUserFromUserId(
  id,
  withWallets = false,
  absolute = true
) {
  let res;
  try {
    res = await fetch("/api/users/id", {
      method: "POST",
      body: JSON.stringify({
        id: id,
        withWallets: withWallets,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
    console.log("user", user);

    return user;
  } catch (e) {
    console.error("Erreur :", e);
    console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
