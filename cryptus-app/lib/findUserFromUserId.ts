import get_base_url from "./get_base_url";

export default async function FindUserFromUserId(
  id,
  withWallets = false,
  absolute = true
) {
  const base_url = get_base_url();
  let res;
  try {
    res = await fetch(base_url + "/api/users/id", {
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
