export default async function FindAllUsers() {
  let res;
  try {
    res = await fetch("/api/users/findAllUsers", {
      method: "POST",
      body: JSON.stringify({}),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const users = await res.json();

    return users;
  } catch (e) {
    console.error("Erreur :", e);
    console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
