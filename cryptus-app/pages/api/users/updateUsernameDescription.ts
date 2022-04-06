import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import get_reserved_usernames from "../../../lib/reserved_usernames";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  console.log("updateUsernameDescription");
  const new_user_name = req.body.new_user_name;
  const old_user_name = req.body.old_user_name;
  const description = req.body.description;

  console.log("body", req.body);

  if (!new_user_name.match(/^[0-9a-z]+$/)) {
    console.log("invalid username");
    res.status(201);
    res.json({});
    return;
  }

  if (get_reserved_usernames().includes(new_user_name)) {
    console.log("reserved username");
    res.status(203);
    res.json({});
    return;
  }

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
    if (e.message.includes("Unique")) {
      console.log("unique username fail");
      res.status(202);
      res.json({});
    } else {
      res.status(500);
      res.json({ error: e });
    }
  } finally {
    await prisma.$disconnect();
  }
}
