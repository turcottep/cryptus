import { NextApiRequest, NextApiResponse } from "next";
import main from "../../../scripts/get_rarity_rank_of_nft";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await main(
      "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
      "BoredApeYatchClub"
    );
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
