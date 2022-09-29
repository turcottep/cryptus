import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  let subscription = req.body.subscription
  let username = req.body.user as string
  try {
    console.log("bro im trying this mans username : ", username);
    console.log("this da sub : ", subscription);
    
    
    const user = await prisma.user.update({
      where: {
        username: 'bruh',
      },
      data: {subscription:subscription}
    });
    console.log("bro im trying this man :", user);

    res.status(201);
    res.json("able to update user wallet");
  } catch (e) {
    res.status(500);
    res.json({ error: "Unable to update user wallet :" + e });
  } finally {
    await prisma.$disconnect();
  }
}
