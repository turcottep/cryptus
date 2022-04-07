import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import get_reserved_usernames from "../../../lib/reserved_usernames";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("updateImageURL");

  try {
    const User = await prisma.user.update({
      where: {
        username: req.body.username,
      },
      data: {
        profile_image_url: req.body.image_url,
      },
    });

    res.status(201);
    res.json({});
  } catch (e) {
    console.log("e", e);
    res.status(500);
    res.json({ error: e });
  } finally {
    await prisma.$disconnect();
  }
}
