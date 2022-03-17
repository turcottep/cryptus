import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import FindUserFromUserId from "../../../lib/findUserFromUserId";
import { data } from "jquery";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    const addedWallet = await prisma.wallet.findUnique({
      where: {
        address: req.body.currentAddress,
      },
    });
    const user = await FindUserFromUserId(addedWallet.userId, true, true);

    const newUser = await prisma.user.update({
      where: {
        username: user.username,
      },
      data: {
        wallets: {
          createMany: {
            data: {
              address: req.body.addressToAdd,
              external_url: req.body.external_url,
              blockchain_id: "ETH",
            },
          },
        },
      },
    });

    res.status(201);
    res.json(newUser);
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to update user wallet :" + e });
  } finally {
    await prisma.$disconnect();
  }
}
