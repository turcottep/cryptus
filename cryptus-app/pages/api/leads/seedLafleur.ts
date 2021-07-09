import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.user.create({
      data: {
        username: "laflow3r",

        email: "alexandre.lafleur@usherbrooke.ca",

        description: "Je vais a MTL pour chercher un bike",

        views: 6969,

        likes: 420,

        hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",

        wallets: {
          create: {
            external_url:
              "https://api.opensea.io/api/v1/assets?owner=0x0da2f3401296427d302326cdf208b79f83abc995&order_direction=asc&offset=0&limit=50",
          },
        },
      },
    });

    res.status(201);

    res.json({});

    console.log("NEW USER");
  } catch (e) {
    res.status(500);

    res.json({ error: "Unable to add lead" });
  } finally {
    await prisma.$disconnect();
  }
}