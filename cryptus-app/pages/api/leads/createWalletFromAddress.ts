import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        email: req.body.username + "(AT)noemail.com",
        displayName: req.body.username,
        description: "",
        views: 0,
        likes: 0,
        hash: "",
        wallets: {
          create: {
            address: req.body.address,
            external_url: req.body.external_url,
            blockchain_id: req.body.blockchain_id,
          },
        },
      },
    });
    console.log("user from prisma:", user);

    res.status(201);
    res.json(user);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to create user  :" + e });
  } finally {
    await prisma.$disconnect();
  }
}
