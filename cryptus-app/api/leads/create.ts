import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const username = "user" + Date.now();
    await prisma.user.create({
      data: {
        username: username,
        email: req.body.email,
        displayName: "",
        description: "",
        views: 0,
        likes: 0,
        hash: req.body.hash,
      },
    });
    res.status(201);
    res.json({});
  } catch (e) {
    if (e.code == "P2002") {
      res.status(202);
      res.json({ error: "Unique Email  :" + e });
    } else {
      res.status(500);
      res.json({ error: "Unable to add  :" + e });
    }
  } finally {
    await prisma.$disconnect();
  }
}
