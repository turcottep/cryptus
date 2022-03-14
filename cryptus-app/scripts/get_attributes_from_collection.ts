import fetch from "node-fetch";
import fs from "fs";
import Moralis from "moralis/node.js";

// async function get_price_for_token_ids(
//   token_ids: string[] | number[],
//   contract_address: string
// ) {
//   const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
//   const token_ids_string = token_ids.map((i) => `&token_ids=${i}`).join("");
//   // console.log("token_ids_string", token_ids_string);
//   let response;
//   try {
//     const url = `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${contract_address}&bundled=false&include_bundled=false${token_ids_string}&side=1&limit=${10}&offset=0&order_by=eth_price&order_direction=asc`;

//     response = await fetch(url, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//         "X-API-KEY": opensea_api_key,
//       },
//     });

//     const data = (await response.json()) as any;

//     for (const order of data.orders) {
//       if (
//         order.taker.address === "0x0000000000000000000000000000000000000000"
//       ) {
//         const floor_price = order.base_price / 10 ** 18;
//         if (floor_price < 0.1) {
//           console.log("order", order);
//           console.log("real money marker");
//           console.log(data.orders[1]);
//           console.log("normal for comparison");
//         }
//         return floor_price > 0.001 ? floor_price : null;
//       }
//     }
//     return null;
//   } catch (error) {
//     console.log("response", response);
//     console.log(error);
//     return null;
//   }
// }

// async function get_price_for_token_ids_wrapper(
//   token_ids: string[] | number[],
//   contract_address: string
// ) {
//   const max_nb = 30;
//   let floor_price = null;
//   for (let i = 0; i < token_ids.length; i += max_nb) {
//     const token_ids_slice = token_ids.slice(i, i + max_nb);
//     // console.log("token_ids_slice", token_ids_slice);
//     const price = await get_price_for_token_ids(
//       token_ids_slice,
//       contract_address
//     );
//     if (price !== null) {
//       if (floor_price === null) {
//         floor_price = price;
//       } else {
//         console.log("price", price, "floor_price", floor_price);
//         floor_price = Math.min(floor_price, price);
//       }
//     }
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//   }
//   return floor_price;
// }

// async function get_all_tokens_from_collection(collection_address: string) {
//   const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
//   const server_url = "https://7n8el022vvrd.usemoralis.com:2053/server";
//   const app_id = "I1l0EVLEqlVx64E44bKf2ytSOzIUSSAqlNlJ5Ijd";

//   Moralis.start({ serverUrl: server_url, appId: app_id });

//   const nfts = (await Moralis.Web3API.token.getAllTokenIds({
//     address: collection_address,
//   })) as any;

//   const total_num = nfts.total;
//   const page_size = nfts.page_size;
//   const all_nfts = nfts.result;

//   for (let i = page_size; i < total_num; i += page_size) {
//     console.log("i", i);
//     const nfts = (await Moralis.Web3API.token.getAllTokenIds({
//       address: collection_address,
//       offset: i,
//     })) as any;
//     all_nfts.push(...nfts.result);
//     await new Promise((resolve) => setTimeout(resolve, 5000));
//   }

//   // console.log("all_nfts", all_nfts.length);

//   // save to file
//   fs.writeFileSync(
//     "./scripts/all_nfts.json",
//     JSON.stringify(all_nfts, null, 2)
//   );

//   // console.log("nfts length", nfts);
// }

// function get_traits_dict_from_json() {
//   const all_nfts = JSON.parse(
//     fs.readFileSync("./scripts/all_nfts.json", "utf8")
//   );
//   // console.log("all_nfts", all_nfts.length);
//   // dict of traits to token ids
//   const all_traits = {};
//   for (const nft of all_nfts) {
//     // console.log("nft", nft);
//     const metadata = JSON.parse(nft.metadata);
//     const traits = metadata.attributes;
//     // console.log("traits", traits);
//     for (const trait of traits) {
//       const key = JSON.stringify(trait);
//       if (all_traits[key]) {
//         all_traits[key].push(nft.token_id);
//       } else {
//         all_traits[key] = [nft.token_id];
//       }
//     }
//   }
//   // console.log("all_traits", all_traits);
//   fs.writeFileSync(
//     "./scripts/all_traits.json",
//     JSON.stringify(all_traits, null, 2)
//   );
//   return all_traits;
// }

// function get_token_ids_from_trait(trait: string) {
//   const all_traits = JSON.parse(
//     fs.readFileSync("./scripts/all_traits.json", "utf8")
//   );
//   console.log("all_traits_length", Object.keys(all_traits).length);

//   const token_ids = all_traits[trait];
//   return token_ids;
// }

// function get_token_id_floor() {
//   const token_id_floor = JSON.parse(
//     fs.readFileSync("./scripts/token_id_floor.json", "utf8")
//   );
//   return token_id_floor;
// }

async function get_floors(contract_address: string) {
  const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
  const token_id_floors = {};
  const trait_dict = {};
  let next = "";
  let response;
  const max_assets = 50;
  for (let i = 0; i < 500; i++) {
    try {
      const url = `https://api.opensea.io/api/v1/assets?order_by=pk&order_direction=asc&asset_contract_address=${contract_address}&limit=${max_assets}&include_orders=true&cursor=${next}`;

      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": opensea_api_key,
        },
      });
      const data = (await response.json()) as any;
      for (const asset of data.assets) {
        // console.log("asset", asset.sell_orders);

        const floor = asset.sell_orders
          ? asset.sell_orders[0].base_price / 10 ** 18
          : null;
        const token_id = asset.token_id;
        // console.log("token_id", token_id, "floor", floor);
        const floor_clean = floor > 0.001 ? floor : null;

        token_id_floors[token_id] = floor_clean;

        const traits = asset.traits;
        for (const trait of traits) {
          const key = JSON.stringify({
            name: trait.trait_type,
            value: trait.value,
          });
          if (trait_dict[key]) {
            trait_dict[key].push(asset.token_id);
          } else {
            trait_dict[key] = [asset.token_id];
          }
        }
      }
      console.log(
        "i",
        i,
        "data.assets.length",
        data.assets.length,
        "next",
        next
      );
      if (data.assets.length < max_assets) {
        break;
      }
      next = data.next;
      // await new Promise((resolve) => setTimeout(resolve, 100));
    } catch (error) {
      console.log("response", response);
      console.log(error);
      // return null;
    }
  }

  return [token_id_floors, trait_dict];
}

async function main(contract_address) {
  console.log("main");
  // start timer
  const start = new Date().getTime();

  const [token_id_floor, traits_dict] = await get_floors(contract_address);

  console.log("token_id_floors", token_id_floor);
  console.log("trait_dict", traits_dict);

  // console.log("token_id_floor", token_id_floor);
  //save to file
  // fs.writeFileSync(
  //   "./scripts/token_id_floor.json",
  //   JSON.stringify(token_id_floor, null, 2)
  // );

  const trait_floor_dict = {};
  for (const trait in traits_dict) {
    const token_ids = traits_dict[trait];
    // console.log("trait", trait, "token_ids", token_ids);
    const floor_prices = token_ids
      .map((token_id) => {
        if (token_id_floor[token_id]) {
          return token_id_floor[token_id];
        } else {
          return null;
        }
      })
      .filter((price) => price !== null);
    const min_price = Math.min(...floor_prices);
    trait_floor_dict[trait] = min_price;
  }
  console.log("trait_floor_dict", trait_floor_dict);
  console.log("trait_floor_dict_length", Object.keys(trait_floor_dict).length);

  const trait_floor_dict_str = JSON.stringify(trait_floor_dict, null, 2);

  // const trait = '{"trait_type":"Eyes","value":"Bored"}';
  // console.log("trait", trait);
  // const token_ids_from_file = get_token_ids_from_trait(trait);

  // // const token_ids = [100, 200, 3519];
  // const floor_price = await get_price_for_token_ids_wrapper(
  // token_ids_from_file,
  // contract_address
  // );
  // console.log("floor_price:", floor_price);

  // end timer
  const end = new Date().getTime();
  const time = end - start;
  console.log("time in seconds:", time / 1000);

  return trait_floor_dict_str;
}

export default main;
