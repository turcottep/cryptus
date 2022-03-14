import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    let collection;
    if (req.body.token_id) {
      collection = await prisma.nftRarity.findMany({
        where: {
          token_id: req.body.token_id,
          CollectionRarity: {
            contract_address: req.body.collection_address,
          },
        },
      });
    } else {
      collection = await prisma.collectionRarity.findUnique({
        include: {
          nfts_rarity: req.body.withNfts,
        },
        where: {
          contract_address: req.body.collection_address,
        },
      });
    }

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
