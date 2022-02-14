import { nft } from "../lib/data_types";

export default async function updateNftsForUser(
  username: string,
  address: string,
  userId: string,
  absolute = true
) {
  let res;
  let nfts_raw;
  type traits = {
    name: string;
    value: any;
    count: number;
    rarity: number;
  };

  try {
    var data;
    //fetch nfts from opensea
    res = await fetch(
      "https://api.opensea.io/api/v1/assets?owner=" +
        address +
        "&order_direction=asc&offset=0&limit=50",
      {
        headers: {
          Accept: "application/json",
          "X-API-KEY": process.env.OPENSEA_API_KEY,
        },
      }
    );
    // res = await fetch(wallet.external_url);
    data = await res.json();

    nfts_raw = data.assets;
  } catch (err) {
    // console.error(err);
    // console.log("response = ", res);
    return null;
  }

  // console.log("traits = ", nfts_raw[0]);
  const nft_clean = nfts_raw.map((nft) => {
    // Sort properties here
    const traits = nft.traits.map((trait) => {
      return {
        name: trait.name,
        value: trait.value,
        count: trait.count,
        rarity: trait.count / 2010863,
      };
    });
    const traits_sorted = traits.sort((a, b) => {
      return a.rarity - b.rarity;
    });

    const rarity_rank = traits_sorted[0].count;

    return {
      name: nft.name ?? nft.collection.name + " #" + nft.id,
      image_url: nft.image_url,
      description: nft.description,
      collection: nft.collection.name,
      token_id: nft.token_id,
      external_url: nft.permalink,
      last_sale_price: nft.last_sale ? nft.last_sale.price ?? 0 : 0,
      last_sale_symbol: nft.last_sale
        ? nft.last_sale.payment_token.symbol
        : "ETH",
      properties: traits_sorted,
      // rarity_rank: nft.traits.reduce((acc, curr) => acc + curr.trait_count, 0),
      rarity_rank: rarity_rank,
    } as nft;
  });

  const nft_stringified = nft_clean.map((nft) => {
    return (nft = {
      traits: JSON.stringify(nft.properties),
      user_id: userId,
      collection: nft.collection,
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

  const base_url = absolute ? process.env.BASE_URL : "/";
  try {
    const res = await fetch(base_url + "api/nfts/update", {
      method: "POST",
      body: JSON.stringify({
        nfts: nft_stringified,
        username: username,
        userId: userId,
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

  return nft_clean;
}
