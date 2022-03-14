import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const wallet = await prisma.wallet.findUnique({
      where: {
        address: req.body.address,
      },
    });
    res.status(201);
    if (wallet) {
      res.json(wallet);
    } else {
      const wallet = {
        id: null,
      };
      res.json(wallet);
    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to connect to DB" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
