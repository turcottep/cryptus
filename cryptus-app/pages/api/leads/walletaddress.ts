import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("prisma balls");
  console.log("address= ", req.body.address);

  try {
    prisma.$connect();
    const wallet = await prisma.wallet.findUnique({
      where: {
        address: req.body.address
      },
    });
    res.status(201);
    console.log("wallet = \n", wallet);
    if (wallet) {
      console.log("found wallet");

      res.json(wallet);
    }
    else {
      console.log("did'nt found wallet");
      const wallet =
      {
        id: null
      }
      res.json(wallet);

    }
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to connect to DB" });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
