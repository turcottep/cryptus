import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        await prisma.user.update({
            where: {
                email: req.body.email
            },
            data: {
                description: req.body.description,
            }
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