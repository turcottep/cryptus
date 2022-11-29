import { collection, nft } from "./data_types";
import GetCollectionTokens from "./get_collection_token";

export default async function get_nfts_for_wallet(
  address: string,
  collections: any
) {
  let res;
  let nfts_raw = [];
  type traits = {
    name: string;
    value: any;
    count: number;
    rarity: number;
  };
  try {
    //fetch collections from opensea
    if (collections) {
      for (let j = 0; j < collections.length; j += 50) {
        let collections_slice = collections.slice(j, j + 50);

        let asset_contract_adresses = "";

        for (const collection of collections_slice) {
          asset_contract_adresses =
            asset_contract_adresses + "&asset_contract_addresses=" + collection;
        }

        console.log(
          "getting the",
          j,
          "to ",
          j + collections_slice.length,
          "nfts :",
          asset_contract_adresses
        );

        let cursor = "";
        for (let i = 0; i < 100; i++) {
          try {
            res = await fetch(
              "https://api.opensea.io/api/v1/assets?owner=" +
                address +
                "&order_direction=desc&limit=30" +
                asset_contract_adresses +
                "&cursor=" +
                cursor,
              {
                headers: {
                  Accept: "application/json",
                  "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
                },
              }
            );
            // res = await fetch(wallet.external_url);
            const data = await res.json();
            cursor = data.next;
            console.log("data", data);
            const nfts_raw_temp = data.assets;
            nfts_raw.push(...nfts_raw_temp);

            // wait 1 second
            await new Promise((r) => setTimeout(r, 1000));

            if (!cursor) break;
          } catch (e) {
            // if (e.status == 429) {
            console.log("error in get_nfts_for_wallet", e);
            console.log("retrying in 10 seconds");

            await new Promise((resolve) => setTimeout(resolve, 10000));
            // }
          }
        }
      }
    }

    // console.log("nfts_raw", nfts_raw);
  } catch (err) {
    console.error(err);
    console.log("response = ", res);
    return null;
  }

  // console.log("traits = ", nfts_raw[0]);
  // const collections_set = new Set();
  const nft_clean = nfts_raw.map((nft, index: number) => {
    // Sort properties here
    let rarity_rank: any = 0;
    let traits_sorted = [];
    let rarity = 0;

    if (nft.collection.slug === "oldbabyclub") {
      console.log("traits", nft.traits);
    }

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
    // collections_set.add(nft.asset_contract.address);
    return {
      name: nft.name ?? nft.collection.name + " #" + nft.id,
      image_url: nft.image_url,
      description: nft.description,
      collection: nft.collection.name,
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
  // console.log("NFTS", nft_clean);
  let nft_cleaner = [];
  nft_cleaner = nft_clean.filter((nft) => nft.image_url != null);
  // console.log("NFTS", nft_cleaner);
  nft_cleaner.sort(function (a, b) {
    return (
      collections.map((e) => e).indexOf(a.collection_address) -
      collections.map((e) => e).indexOf(b.collection_address)
    );
  });

  return nft_cleaner;
}
