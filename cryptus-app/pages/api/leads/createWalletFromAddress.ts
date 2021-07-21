import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
    console.log("creating a new man from wallet", req.body);

    try {
        const currentNumberOfUsers = await prisma.user.count();
        const username = "user" + String(currentNumberOfUsers);
        const user = await prisma.user.create({
            data: {
                username: username,
                email: username + "@noemail.com",
                displayName: username,
                description: "",
                views: 0,
                likes: 0,
                hash: "",
                wallets: {
                    create: {
                        address: req.body.address,
                        external_url: req.body.external_url,
                        blockchain_id: req.body.blockchain_id,
                    },
                },
            },
        })
        console.log("user from prisma:", user);

        res.status(201);
        res.json(user);
    } catch (e) {
        res.status(500);
        res.json({ error: "Unable to create user  :" + e })
    } finally {
        await prisma.$disconnect()
    }

}