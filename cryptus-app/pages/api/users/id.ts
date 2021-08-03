import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("trying to find user with this id:", req.body.id);

  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      include: {
        wallets: req.body.withWallets,
      },
      where: {
        id: req.body.id,
      },
    });
    res.status(201);
    res.json(user);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to find user" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
