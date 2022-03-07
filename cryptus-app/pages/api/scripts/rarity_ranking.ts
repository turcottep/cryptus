import { NextApiRequest, NextApiResponse } from "next";
import main from "../../../scripts/get_attributes_from_collection";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer...");

    await main();
    const data = { deez: "yo" };

    // console.log("user: ", user);
    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
