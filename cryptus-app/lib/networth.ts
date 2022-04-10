import { nft_collection } from "./data_types";
import get_base_url from "./get_base_url";

export default async function calculate_networth(
  collections: nft_collection[]
) {
  const collection_addresses = Object.keys(collections);

  const base_url = get_base_url();
  const res = await fetch(base_url + "/api/networth/networth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      addresses: collection_addresses,
    }),
  });
  const floors = await res.json();
  const floors_dict = {};
  floors.forEach((floor) => {
    floors_dict[floor.address] = JSON.parse(floor.trait_floor_dict);
  });
  //   console.log("floors_dict", floors_dict);

  let networth = 0;

  for (const collection of collections) {
    const floor_dict = floors_dict[collection.address];
    if (!floor_dict) {
      // console.error("floor_dict not found for collection", collection.name);
      continue;
    }
    let collection_value = 0;
    for (const nft of collection.nfts) {
      const floors = [];
      //   console.log("nft", nft);

      for (const trait of nft.properties) {
        const key = JSON.stringify({ name: trait.name, value: trait.value });
        const trait_floor = floor_dict[key];
        if (!trait_floor) {
          console.error("trait_floor not found for trait", trait.trait_id);
          continue;
        }
        floors.push(trait_floor);
      }
      console.log("floors", floors);
      nft.value = floors.length > 0 ? Math.max(...floors) : 0;
      //   console.log("name", nft.name, "nft_floor", nft.value);

      networth += nft.value;
      collection_value += nft.value;
    }
    collection.value = collection_value;
  }
  //   console.log("networth", networth);

  return networth;
}
