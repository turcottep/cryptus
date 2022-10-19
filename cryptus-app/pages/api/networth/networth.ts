import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const collections = req.body.collections as string[];

    // start timer
    const start = Date.now();

    const collection_floors = await prisma.collectiontraitfloor.findMany({
      where: {
        address: {
          in: collections,
        },
      },
    });

    // end timer
    const end = Date.now();
    const time = end - start;
    console.log("time", time / 1000 + "s");

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
