import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const collections = req.body.collections as string[];
    // console.log("trying to get from db user with username: ", username);

    const collection_floors = await prisma.collectiontraitfloor.findMany({
      where: {
        address: {
          in: collections,
        },
      },
    });

    // console.log("collection_floors : ", collection_floors);

    res.status(201);
    res.json(collection_floors);
  } catch (e) {
    res.status(500);
    console.error("There was an error");
    res.json({ error: "Unable to find user", e });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
