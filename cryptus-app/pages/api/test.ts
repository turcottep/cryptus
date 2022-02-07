import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer...");

    prisma.$connect();

    // start timer
    const start = new Date().getTime();

    const data =
      await prisma.$queryRaw`SELECT * FROM marketsales.xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d;`;
    console.log(data);

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json({ time: time });
  } catch (e) {
    res.status(500);
    console.error("There was an error");
    res.json({ error: "Unable to find data", e });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
