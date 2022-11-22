import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.user.create({
      data: {
        username: "sultanpink",
        email: "sultanpink@gmail.com",
        displayName: "sultanpink.eth",
        description: "Guy with historical networth",
        views: 6000,
        likes: 400,
        hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",
        wallets: {
          create: {
            address: "0x052288F424Ec1a127093E29BaDC21Dd2ddb860A1".toLowerCase(),
            external_url:
              "https://api.opensea.io/api/v1/assets?owner=0x052288F424Ec1a127093E29BaDC21Dd2ddb860A1&order_direction=asc&offset=0&limit=2",
          },
        },
      },
    });

    res.status(201);

    res.json({});
  } catch (e) {
    res.status(500);

    res.json({ error: "Unable to add lead" });
    console.error("Unable to add lead", e);
  } finally {
    await prisma.$disconnect();
  }
}
