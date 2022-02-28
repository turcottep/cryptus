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
        address_cropped + "_" + viewing_mode
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
    // const data = await prisma.$queryRaw(query);
    // console.log("data : ", data);
    const prices = [];
    const volumes = [];
    const counts = [];
    answer.forEach((data) => {
      let price, count, volume;
      if (viewing_mode != "day" && viewing_mode != "week") {
        price = data.map((row) => {
          return parseFloat(row.average_price);
        });
        count = data.map((row) => {
          return parseFloat(row.count);
        });
        volume = data.map((row) => {
          return parseFloat(row.volume_eth);
        });
      } else {
        price = data.map((row) => {
          return parseFloat(row.total_price);
        });
        count = null;
        volume = null;
      }
      prices.push(price);
      counts.push(count);
      volumes.push(volume);
    });

    // console.log(answer.length);

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json({ prices, counts, volumes });
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
