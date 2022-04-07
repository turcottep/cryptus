import { NextApiRequest, NextApiResponse } from "next";
import { collection100list } from "../../../lib/collectionDictionary";
import GetNameWithoutSpaces from "../../../lib/get_name_without_spaces";
import getCollectionFloorPriceWithOpensea from "../../../lib/get_collection_floor_price";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //   "BoredApeYatchClub"
    const floorPrice = await getCollectionFloorPriceWithOpensea(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d"
    );
    console.log("floorPrice", floorPrice);
    const data = { deez: "yo" };

    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
