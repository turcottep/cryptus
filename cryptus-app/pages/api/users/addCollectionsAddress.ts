import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("addCollectionsAddress, req.body: ", req.body);

  try {
    const newUser = await prisma.user.update({
      include: {
        wallets: req.body.withWallets,
      },
      where: {
        username: req.body.username,
      },
      data: {
        collections_address_list: req.body.addresses,
        collections_list: req.body.slugs,
      },
    });
    res.status(201);
    res.json(newUser);
  } catch (e) {
    // console.log(e);
    res.status(500);
    res.json({ error: "Unable to update user collections address :" + e });
  } finally {
    await prisma.$disconnect();
  }
}
