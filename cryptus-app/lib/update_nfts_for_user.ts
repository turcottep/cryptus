import { nft } from "../lib/data_types";
import GetCollectionTokens from "../lib/get_collection_token";

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
    console.error(err);
    console.log("response = ", res);
    return null;
  }

  // let collection_tokens = [];
  // Uncomment this section to generate the rarity rank for user.js mock file
  // for (const nft of nfts_raw) {
  //   const size = await GetCollectionTokens(nft.asset_contract.address);
  //   console.log("size", size);
  //   // Etherscan only allow us to do 5 calls per seconds
  //   await new Promise((r) => setTimeout(r, 200));
  //   collection_tokens.push(size);
  // }
  // console.log("traits = ", nfts_raw[0]);
  const nft_clean = nfts_raw.map((nft, index: number) => {
    // Sort properties here
    let rarity_rank: any = 0;
    let traits_sorted = [];
    let rarity = 0;
    if (nft.traits.length > 0) {
      const traits = nft.traits.map((trait) => {
        return {
          name: trait.trait_type,
          value: trait.value,
          count: trait.trait_count,
          rarity: rarity,
        };
      });
      traits_sorted = traits.sort((a, b) => {
        return a.rarity - b.rarity;
      });
      // The rarity rank still need to add rarity of non-existant traits add : 1/((total-nb_with_trait)/total)
      // Rarity rank is calculated from it's traits and rounded the result. The equation is :sum(1/(nb_with_trait/total_count))
      // rarity_rank = Math.round(
      //   traits_sorted
      //     .map((trait) => {
      //       return 1 / trait.rarity;
      //     })
      //     .reduce((partialSum, a) => partialSum + a, 0)
      // );
    }
    return {
      name: nft.name ?? nft.collection.name + " #" + nft.id,
      image_url: nft.image_url,
      description: nft.description,
      collection: nft.collection.name,
      collection_size: 0,
      collection_address: nft.asset_contract.address,
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
      properties: JSON.stringify(nft.properties),
      user_id: userId,
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
