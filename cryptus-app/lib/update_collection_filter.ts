import get_base_url from "./get_base_url";

export default async function update_collection_filter(
  username: string,
  collection_filter: string[]
) {
  const base_url = get_base_url();
  let res;
  try {
    res = await fetch(base_url + "/api/nfts/filter", {
      method: "POST",
      body: JSON.stringify({
        username: username,
        collection_filter: collection_filter,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("user", data);

    return data;
  } catch (e) {
    console.error("Erreur :", e);
    console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}