import fetch from "node-fetch";

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
        const floor = asset.sell_orders
          ? asset.sell_orders[0].base_price / 10 ** 18
          : null;
        const token_id = asset.token_id;

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
      await new Promise((resolve) => setTimeout(resolve, 10));
    } catch (error) {
      console.log("response", response);
      console.log(error);
    }
  }

  return [token_id_floors, trait_dict];
}

async function get_trait_floor_for_collection(contract_address) {
  console.log("main");

  // start timer
  const start = new Date().getTime();

  const [token_id_floor, traits_dict] = await get_floors(contract_address);

  console.log("token_id_floors", token_id_floor);
  console.log("trait_dict", traits_dict);

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

export default get_trait_floor_for_collection;
