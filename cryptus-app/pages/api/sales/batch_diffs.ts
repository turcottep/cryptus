import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer...");

    prisma.$connect();
    const queries = [];
    const adresses = req.body.adresses;
    let viewing_mode = req.body.viewingmode;

    adresses.forEach((address) => {
      const address_cropped = address.substring(1);
      console.log("address_cropped", address_cropped);
      const query = `SELECT * FROM marketsales.${
        address_cropped + "_differentials"
      };`;
      queries.push(query);
    });
    // start timer
    const start = new Date().getTime();
    const answer = await prisma.$transaction([
      prisma.$queryRaw(queries[0]),
      prisma.$queryRaw(queries[1]),
      prisma.$queryRaw(queries[2]),
      prisma.$queryRaw(queries[3]),
      prisma.$queryRaw(queries[4]),
      prisma.$queryRaw(queries[5]),
      prisma.$queryRaw(queries[6]),
      prisma.$queryRaw(queries[7]),
      prisma.$queryRaw(queries[8]),
      prisma.$queryRaw(queries[9]),
    ]);
    // console.log(answer);
    let ans = [];
    answer.forEach((element) => {
      element.forEach((littleman) => {
        if (littleman.view == viewing_mode) {
          console.log("*****", littleman.view, viewing_mode);
          ans.push(littleman.differential);
          console.log(ans);
        }
      });
    });

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json(ans);
  } catch (e) {
    res.status(500);
    console.error("There was an error deep wond", e);
    res.json({ error: "Unable to find data deep down", e });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
