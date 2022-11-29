import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const username = req.body.username as string;
    console.log("trying to get from db user with username: ", username);

    const user = await prisma.user.findUnique({
      include: {
        wallets: req.body.withWallets,
        nfts: req.body.withNfts,
      },
      where: {
        username: username,
      },
    });
    // console.log("user: ", user);

    if (!user) throw new Error("User not founde");

    res.status(201);
    res.json(user);
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
