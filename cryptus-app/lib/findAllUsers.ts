import get_base_url from "./get_base_url";

export default async function FindAllUsers() {
  const base_url = get_base_url();
  let res;
  try {
    res = await fetch(base_url + "/api/users/findAllUsers", {
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
