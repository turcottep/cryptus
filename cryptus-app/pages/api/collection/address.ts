import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const collection = await prisma.collectionRarity.findUnique({
      where: {
        contract_address: req.body.collection_address,
      },
    });
    // console.log("Collection backend", collection);

    res.status(201);
    res.json(collection);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to find collection" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
