import fetch from "node-fetch";
import fs from "fs";
import Moralis from "moralis/node.js";

async function get_price_for_token_ids(
  token_ids: string[] | number[],
  contract_address: string
) {
  const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
  const token_ids_string = token_ids.map((i) => `&token_ids=${i}`).join("");
  // console.log("token_ids_string", token_ids_string);
  let response;
  try {
    const url = `https://api.opensea.io/wyvern/v1/orders?asset_contract_address=${contract_address}&bundled=false&include_bundled=false${token_ids_string}&side=1&limit=${10}&offset=0&order_by=eth_price&order_direction=asc`;

    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": opensea_api_key,
      },
    });

    const data = (await response.json()) as any;

    for (const order of data.orders) {
      if (
        order.taker.address === "0x0000000000000000000000000000000000000000"
      ) {
        const floor_price = order.base_price / 10 ** 18;
        if (floor_price < 0.1) {
          console.log("order", order);
          console.log("real money marker");
          console.log(data.orders[1]);
          console.log("normal for comparison");
        }
        console.log("sale kind", order.sale_kind);

        console.log("floor_price: ", floor_price);
        return floor_price > 0.001 ? floor_price : null;
      }
    }
  } catch (error) {
    console.log("response", response);
    console.log(error);
    return null;
  }
}

async function get_price_for_token_ids_wrapper(
  token_ids: string[] | number[],
  contract_address: string
) {
  const max_nb = 30;
  let floor_price = null;
  for (let i = 0; i < token_ids.length; i += max_nb) {
    const token_ids_slice = token_ids.slice(i, i + max_nb);
    // console.log("token_ids_slice", token_ids_slice);
    const price = await get_price_for_token_ids(
      token_ids_slice,
      contract_address
    );
    if (price !== null) {
      if (floor_price === null) {
        floor_price = price;
      } else {
        floor_price = Math.min(floor_price, price);
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 1500));
  }
  return floor_price;
}

async function get_all_tokens_from_collection(collection_address: string) {
  const opensea_api_key = "e50f2020ec49494e8ab461b871309fc9";
  const server_url = "https://7n8el022vvrd.usemoralis.com:2053/server";
  const app_id = "I1l0EVLEqlVx64E44bKf2ytSOzIUSSAqlNlJ5Ijd";

  Moralis.start({ serverUrl: server_url, appId: app_id });

  const nfts = (await Moralis.Web3API.token.getAllTokenIds({
    address: collection_address,
  })) as any;

  const total_num = nfts.total;
  const page_size = nfts.page_size;
  const all_nfts = nfts.result;

  for (let i = page_size; i < total_num; i += page_size) {
    console.log("i", i);
    const nfts = (await Moralis.Web3API.token.getAllTokenIds({
      address: collection_address,
      offset: i,
    })) as any;
    all_nfts.push(...nfts.result);
    await new Promise((resolve) => setTimeout(resolve, 5000));
  }

  // console.log("all_nfts", all_nfts.length);

  // save to file
  fs.writeFileSync(
    "./scripts/all_nfts.json",
    JSON.stringify(all_nfts, null, 2)
  );

  // console.log("nfts length", nfts);
}

function get_traits_dict_from_json() {
  const all_nfts = JSON.parse(
    fs.readFileSync("./scripts/all_nfts.json", "utf8")
  );
  // console.log("all_nfts", all_nfts.length);
  // dict of traits to token ids
  const all_traits = {};
  for (const nft of all_nfts) {
    // console.log("nft", nft);
    const metadata = JSON.parse(nft.metadata);
    const traits = metadata.attributes;
    // console.log("traits", traits);
    for (const trait of traits) {
      const key = JSON.stringify(trait);
      if (all_traits[key]) {
        all_traits[key].push(nft.token_id);
      } else {
        all_traits[key] = [nft.token_id];
      }
    }
  }
  // console.log("all_traits", all_traits);
  fs.writeFileSync(
    "./scripts/all_traits.json",
    JSON.stringify(all_traits, null, 2)
  );
}

function get_token_ids_from_trait(trait: string) {
  const all_traits = JSON.parse(
    fs.readFileSync("./scripts/all_traits.json", "utf8")
  );
  console.log("all_traits_length", Object.keys(all_traits).length);

  const token_ids = all_traits[trait];
  return token_ids;
}

async function main() {
  console.log("main");
  const contract_address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  //   const token_ids = await get_all_tokens_from_collection(contract_address);
  const traits_dict = get_traits_dict_from_json();

  const trait = '{"trait_type":"Eyes","value":"Bored"}';
  console.log("trait", trait);
  const token_ids_from_file = get_token_ids_from_trait(trait);

  // start timer
  const start = new Date().getTime();

  // // const token_ids = [100, 200, 3519];
  const floor_price = await get_price_for_token_ids_wrapper(
    token_ids_from_file,
    contract_address
  );
  console.log("floor_price:", floor_price);

  // end timer
  const end = new Date().getTime();
  const time = end - start;
  console.log("time", time);
}

export default main;
