export default async function FindCollectionRarityData(
  collectionAddress,
  token_id = "",
  withNfts = false,
  absolute = true
) {
  const base_url = absolute ? process.env.BASE_URL : "/";
  let res;
  try {
    res = await fetch(base_url + "api/collection/address", {
      method: "POST",
      body: JSON.stringify({
        collection_address: collectionAddress,
        withNfts: withNfts,
        token_id: token_id,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const collection = await res.json();
    // console.log("Collection : ", collection);
    return collection;
  } catch (e) {
    console.error("Erreur :", e);
    console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}