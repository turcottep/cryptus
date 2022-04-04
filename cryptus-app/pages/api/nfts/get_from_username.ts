import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const username = req.body.username as string;
    console.log("Getting NFTs from our db with : ", username);

    const user = await prisma.user.findUnique({
      include: {
        nfts: req.body.withNfts,
      },
      where: {
        username: username,
      },
    });

    res.status(201);
    res.json(user.nfts);
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
