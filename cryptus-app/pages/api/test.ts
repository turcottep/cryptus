import { NextApiRequest, NextApiResponse } from "next";

import fs from "fs";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // const opensea_api_key = process.env.OPENSEA_API_KEY;

    // // const data = get_opensea_graphql();
    // const data = await get_dict_combined();

    // const collections = Object.keys(data).map((key) => {
    //   return data[key];
    // });

    // console.log("collections", collections);
    // console.log("collections", collections.length);

    // // get contract addresse for each slug
    // const collection_list = [];

    // // get contract addresses for each slug from opensea
    // for (const slug of collections) {
    //   const url = "https://api.opensea.io/api/v1/collection/" + slug;
    //   const response = await fetch(url, {
    //     headers: {
    //       "X-API-KEY": opensea_api_key,
    //     },
    //   });
    //   const data = await response.json();

    //   console.log("data", data);

    //   // const contract_address = data.collection.primary_asset_contracts[0].address;

    //   // wait 10 seconds
    //   await new Promise((resolve) => setTimeout(resolve, 1000));

    //   collection_list.push(data);
    // }

    // // save to file
    // fs.writeFileSync(
    //   "public/collection_list.json",
    //   JSON.stringify(collection_list, null, 2)
    // );

    // read from file
    const collection_list = JSON.parse(
      fs.readFileSync("public/collection_list.json", "utf8")
    );
    console.log("collection_list", collection_list);

    const collections_dict = {};

    for (const collection of collection_list) {
      console.log("collection", collection);
      if (collection.success === false) {
        continue;
      }

      const slug = collection.collection.slug;
      const address =
        collection.collection.primary_asset_contracts.length > 0
          ? collection.collection.primary_asset_contracts[0].address
          : null;
      const ticker =
        collection.collection.primary_asset_contracts.length > 0
          ? collection.collection.primary_asset_contracts[0].symbol
          : null;
      const logo = collection.collection.image_url;
      const name = collection.collection.name;
      const floor_price = collection.collection.stats.floor_price;
      const floor_price_delta = 0.1 * floor_price;
      const data_price = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      const data_volume = [];

      collections_dict[slug] = {
        slug: slug,
        address: address,
        ticker: ticker,
        logo: logo,
        name: name,
        floor_price: floor_price,
        floor_price_delta: floor_price_delta,
        data_price: data_price,
        data_volume: data_volume,
      };
    }

    console.log("collections_dict", collections_dict);

    // save to file
    fs.writeFileSync(
      "public/collections_dict.json",
      JSON.stringify(collections_dict, null, 2)
    );

    res.json({ done: true });
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
