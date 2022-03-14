import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

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
    const query_diff = `SELECT * FROM marketsales.${
      address_cropped + "_differentials"
    };`;
    const query = `SELECT * FROM marketsales.${
      address_cropped + "_" + viewing_mode
    };`;
    const answer = await prisma.$transaction([
      prisma.$queryRaw(query),
      prisma.$queryRaw(query_diff),
    ]);
    const data = answer[0];
    const data_diff = answer[1];
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

    let delta = 0;
    data_diff.forEach((littleman) => {
      if (viewing_mode == "alltime") {
        viewing_mode = "year";
      }
      if (littleman.view == viewing_mode) {
        console.log("*****", littleman.view, viewing_mode);
        delta = parseFloat(littleman.differential);
        console.log(delta);
      }
    });

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json({ price, count, volume, delta });
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
