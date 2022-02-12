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
    const properties: traits[] = [];
    if (!(nft.traits === undefined) && !(nft.traits.length == 0)) {
      const first_trait: traits = {
        name: nft.traits[0].trait_type,
        value: nft.traits[0].value,
        count: nft.traits[0].trait_count,
        rarity: nft.traits[0].trait_count / 2010863, //  CryptoKitties (CK)
      };
      properties.push(first_trait);

      for (const trait of nft.traits) {
        const new_trait: traits = {
          name: trait.trait_type,
          value: trait.value,
          count: trait.trait_count,
          //TODO find the total number of nfts in a collection instead of a const
          // rarity: trait.trait_count / 10000,
          rarity: trait.trait_count / 2010863, //  CryptoKitties (CK)
        };
        if (
          !(
            new_trait.name in
            properties.map((prop) => {
              return prop.name;
            })
          )
        ) {
          properties_loop: for (
            let index = 0;
            index < properties.length;
            index++
          ) {
            if (new_trait.rarity < properties[index].rarity) {
              properties.splice(index, 0, new_trait);
              break properties_loop;
            }
          }
        }
      }
    }

    // console.log(properties);
    // const nft_properties = JSON.stringify(properties);
    const nft_properties = properties;
    let rarity_rank: number = 0;
    // Implement something in case there is no trait
    if (properties.length > 0) {
      rarity_rank = properties[0].rarity * 2010863; //  CryptoKitties (CK)-- Algo is only based on it's rarest trait
    }

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
      properties: nft_properties,
      // rarity_rank: nft.traits.reduce((acc, curr) => acc + curr.trait_count, 0),
      rarity_rank: rarity_rank,
    } as nft;
  });
  //console.log("First NFT : ", nft_clean[0]);

  // const base_url = absolute ? process.env.BASE_URL : "/";
  // try {
  //   const res = await fetch(base_url + "api/nfts/update", {
  //     method: "POST",
  //     body: JSON.stringify({
  //       nfts: nft_clean,
  //       username: username,
  //       userId: userId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   });
  //   if (res.status !== 200 && res.status !== 201) {
  //     throw new Error("Error updating nfts for user");
  //   }
  // } catch (e) {
  //   console.error("Erreur :", e);
  //   return null;
  // }

  return nft_clean;
}
