import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    let username = String(req.body.username);

    username = username.toLowerCase();

    if (!username.match(/^[0-9a-z]+$/)) {
        res.status(500);
        res.json({
            error: "Username not valid"
        });
        return false;

    }

    try {
        await prisma.user.update({
            where: {
                email: req.body.email
            },
            data: {
                username: username,
                displayName: req.body.displayName
            }
        })

        res.status(201);
        res.json({});
    } catch (e) {
        if (e.code == "P2002") {
            res.status(202);
            res.json({ error: "Unique Username  :" + e })
        } else {
            res.status(500);
            res.json({ error: "Unable to add lead" + e })
        }
    } finally {
        await prisma.$disconnect()
    }

}