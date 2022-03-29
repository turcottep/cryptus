import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();

    // console.log("nft data: ", req.body.nfts);

    await prisma.nft.deleteMany({
      where: {
        userId: req.body.userId,
      },
    });

    const user = await prisma.user.update({
      where: {
        username: req.body.username,
      },
      data: {
        collections_list: req.body.collections_list as string[],

        nfts: {
          // add every nft in req.body.nfts
          createMany: {
            data: req.body.nfts,
          },
        },
      },
    });

    res.status(201);
    // console.log("user: ", user);
    res.json({});
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
