export default async function FindCollectionRarityData(
  collectionAddress,
  token_id = "",
  withNfts = false
) {
  let res;
  try {
    res = await fetch("/api/collection/address", {
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
    console.log("Collection not found");
    // console.error("Erreur :", e);
    // console.log("res :", res);

    // Promise.reject(new Error("Unable to connect to server"));
    return null;
  }
}
