import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      include: {
        wallets: req.body.withWallets,
      },
      where: {
        username: req.body.username,
      },
    });
    res.status(201);
    if (!user) throw new Error("User not found");
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
