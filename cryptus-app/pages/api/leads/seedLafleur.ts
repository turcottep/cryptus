import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("creating Seed");

  try {
    await prisma.user.create({
      data: {
        username: "laflow3r",
        email: "alexandre.lafleur@usherbrooke.ca",
        displayName: "Lafleur",
        description: "Je vais a MTL pour chercher un bike",
        views: 6000,
        likes: 400,
        hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",
        wallets: {
          create: {
            address: "0x0da2f3401296427d302326cdf208b79f83abc995",
            external_url:
              "https://api.opensea.io/api/v1/assets?owner=0x0da2f3401296427d302326cdf208b79f83abc995&order_direction=asc&offset=0&limit=50",
          },
        },
      },
    });

    res.status(201);

    res.json({});

  } catch (e) {
    res.status(500);

    res.json({ error: "Unable to add lead" });
    console.error("Unable to add lead", e)
  } finally {
    await prisma.$disconnect();
  }
}
