export default async function update_collection_filter(
  username: string,
  collection_filter: string[]
) {
  console.log("update_collection_filter", username, collection_filter);

  let res;
  try {
    res = await fetch("/api/nfts/filter", {
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

    return data;
  } catch (e) {
    console.error("Erreur :", e);
    console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
