import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        await prisma.user.create({
            data: {
                username: 'Alice',
                email: req.body.email,
                description: 'yoooo',
                views: 5,
                likes: 2

            },
        })
        res.status(201);
        res.json({});
        console.log("NEW USER")
    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to add lead" })
    } finally {
        await prisma.$disconnect()
    }

}