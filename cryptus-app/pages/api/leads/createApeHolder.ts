import { NextApiRequest, NextApiResponse } from "next";

import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {

    try {
        await prisma.user.create({
            data: {
                username: "apeholder",
                email: "apehodler@hotmail.com",
                displayName: "Ape Holder",
                description: "I am an Ape Holder",
                views: 555,
                likes: 5,
                hash: "4d6da51cf568dd8037650a5ae0fe1c4344cca65361f3096d4b6a926614ab59bc",
                wallets: {
                    create: {
                        address: "0x68c4d9e03d7d902053c428ca2d74b612db7f583a",
                        external_url:
                            "https://api.opensea.io/api/v1/assets?owner=0x68c4d9e03d7d902053c428ca2d74b612db7f583a&order_direction=asc&offset=0&limit=50",
                    },
                },
            },
        });

        res.status(201);

        res.json({});

    } catch (e) {
        res.status(500);

        res.json({ error: "Unable to add lead" });
        console.error("Unable to add lead", e)
    } finally {
        await prisma.$disconnect();
    }
}
