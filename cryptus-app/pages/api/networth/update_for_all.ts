import { NextApiRequest, NextApiResponse } from "next";
import get_nfts_for_wallet from "../../../lib/get_nfts_for_wallet";
import calculate_networth from "../../../lib/networth";
import prisma from "../../../lib/prisma";
import sortNftsIntoCollections from "../../../lib/sort_nfts_into_collections";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();

    // get collections from user
    const users = await prisma.user.findMany({ include: { wallets: true } });

    console.log("users", users.length);

    for (let i = 0; i < users.length; i++) {
      console.log("user", i, users[i]);

      const user = users[i];
      const nfts = [];

      for (let i = 0; i < user.wallets.length; i++) {
        const wallet = user.wallets[i];
        let nfts_per_wallet = await get_nfts_for_wallet(wallet.address);

        nfts.push(...nfts_per_wallet);
      }

      if (nfts.length > 0) {
        const nfts_collections = sortNftsIntoCollections(nfts);
        console.log("nfts_collections", nfts_collections);

        const networth = await calculate_networth(nfts_collections);
        console.log("networth", networth);

        await prisma.user.update({
          where: { id: user.id },
          data: { networth: networth },
        });
      } else {
        console.log("no nfts");
      }
    }

    // const collection_floors = await prisma.collectiontraitfloor.findMany({
    //   where: {
    //     address: {
    //       in: collections,
    //     },
    //   },
    // });

    const data = { yoo: "yoo" };

    res.status(201);
    res.json(data);
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
