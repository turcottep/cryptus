export default async function save_nfts_to_user(user, nfts) {
  console.log("save_nfts_to_user, user: ", user);
  console.log("save_nfts_to_user, nfts: ", nfts);
  console.log("save_nfts_to_user, nfts.length: ", nfts.length);

  const nfts_obj = nfts.map((nft) => {
    return (nft = {
      properties: JSON.stringify(nft.properties),
      user_id: user.userId,
      collection: nft.collection,
      collection_size: nft.collection_size,
      collection_address: nft.collection_address,
      last_sale_price: nft.last_sale_price,
      last_sale_symbol: nft.last_sale_symbol,
      rarity_rank: nft.rarity_rank,
      image_url: nft.image_url,
      external_url: nft.external_url,
      description: nft.description,
      name: nft.name,
      token_id: nft.token_id,
    });
  });

  const collections_list = Array.from(
    new Set(nfts_obj.map((nft) => nft.collection))
  );

  const nfts_stringified = JSON.stringify(nfts_obj);

  try {
    const res = await fetch("/api/nfts/update", {
      method: "POST",
      body: JSON.stringify({
        user_nfts_string: nfts_stringified,
        collections_list: collections_list,
        username: user.username,
        userId: user.userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (res.status !== 200 && res.status !== 201) {
      throw new Error("Error updating nfts for user");
    }
  } catch (e) {
    console.error("Erreur :", e);
    return null;
  }
}
