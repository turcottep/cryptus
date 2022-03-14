import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    await prisma.user.create({
      data: {
        username: "garyvee",
        email: "garyvee@hotmail.com",
        displayName: "Gary Vaynerchuk",
        description:
          "Family First. CEO of @Vaynermedia. 🐈‍⬛ Creator of @veefriends. Investor in Twitter, Coinbase & more. Die hard @NYJets fan. @winetexts@vaynersports",
        views: 555,
        likes: 5,
        hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",
        wallets: {
          create: {
            address: "0x5ea9681c3ab9b5739810f8b91ae65ec47de62119",
            external_url:
              "https://api.opensea.io/api/v1/assets?owner=0x5ea9681c3ab9b5739810f8b91ae65ec47de62119&order_direction=asc&offset=0&limit=50",
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
