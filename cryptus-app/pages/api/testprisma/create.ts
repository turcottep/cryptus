import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';



export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log("maaan");
    const prisma = new PrismaClient()
    console.log("yooooooo");

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
    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to add lead" })
    } finally {
        await prisma.$disconnect()
    }

}