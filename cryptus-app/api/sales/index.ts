import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer...");

    prisma.$connect();
    const address = req.body.address;
    let viewing_mode = req.body.viewingmode;
    //remove first characeter
    const address_cropped = address.substring(1);
    console.log("address_cropped", address_cropped);
    // start timer
    const start = new Date().getTime();
    const query = `SELECT * FROM marketsales.${
      address_cropped + "_" + viewing_mode
    };`;
    const data = await prisma.$queryRaw(query);
    // console.log("data : ", data);
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

    // console.log(data);

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json({ price, count, volume });
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
