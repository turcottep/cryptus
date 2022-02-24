import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("updateUsernameDescription");
  const new_user_name = req.body.new_user_name;
  const old_user_name = req.body.old_user_name;
  const description = req.body.description;

  console.log("body", req.body);

  try {
    const boy = await prisma.user.update({
      where: {
        username: req.body.old_user_name,
      },
      data: {
        username: req.body.new_user_name,
        description: req.body.description,
      },
    });
    console.log("boy", boy);

    res.status(201);
    res.json({});
  } catch (e) {
    console.log("e", e);

    res.status(500);
    res.json({ error: "Unable to update user" });
  } finally {
    await prisma.$disconnect();
  }
}
