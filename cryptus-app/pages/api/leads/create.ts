import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        var currentNumberOfUsers = await prisma.user.count()
        await prisma.user.create({
            data: {
                username: "user" + String(currentNumberOfUsers),
                email: req.body.email,
                displayName: "",
                description: "",
                views: 0,
                likes: 0,
                hash: req.body.hash,
            },
        })

        res.status(201);
        res.json({});
    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to add  :" + e })
    } finally {
        await prisma.$disconnect()
    }

}