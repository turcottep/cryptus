import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        profile_image_url: true,
      },
    });
    console.log("users: ", users.length);

    res.status(201);
    res.json(users);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to find all users" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
