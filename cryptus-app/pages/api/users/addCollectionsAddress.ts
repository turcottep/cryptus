import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const newUser = await prisma.user.update({
      where: {
        username: req.body.username,
      },
      data: {
        collections_list: req.body.address,
      },
    });

    res.status(201);
    res.json(newUser.collections_list);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to update user collections address :" + e });
  } finally {
    await prisma.$disconnect();
  }
}
