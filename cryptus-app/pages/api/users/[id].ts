import { NextApiRequest, NextApiResponse } from "next";
import router from "next/router";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  const {username} = router.query;
  try {
    prisma.$connect();
    const user = await prisma.user.findUnique({
      include: {
        wallets: true,
      },
      where: {
        username: String(username),
      },
    });
    res.status(201);
    res.json(user);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to add lead" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
