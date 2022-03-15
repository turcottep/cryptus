import { NextApiRequest, NextApiResponse } from "next";
import { collection100list } from "../../lib/collectionDictionary";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = collection100list.map((col) => {
      return `${col.address}": "${col.name}`;
    });

    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
