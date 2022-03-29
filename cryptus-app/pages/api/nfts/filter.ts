import { create } from "domain";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    prisma.$connect();

    console.log("updating filter in backend");
    const username = req.body.username;
    const collection_filter = req.body.collection_filter as string[];

    const user = await prisma.user.update({
      where: {
        username: username,
      },
      data: {
        collections_filter: collection_filter,
      },
    });

    res.status(201);
    // console.log("user: ", user);
    res.json({});
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
