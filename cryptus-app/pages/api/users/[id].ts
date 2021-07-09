import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      include: {
        wallets: true,
      },
      where: {
        username: "laflow3r",
      },
    });
    res.status(201);
    res.json(user);
    console.log(user);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to add lead" });
    console.log(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
