import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import collections_dict from "../../../lib/collectionDictionary";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    console.log("starting timer for batch sales data...");

    prisma.$connect();
    const queries = [];
    const queries_diff = [];
    const adresses = req.body.adresses;
    let viewing_mode = req.body.viewingmode;

    adresses.forEach((address) => {
      const address_cropped = address.substring(1);
      console.log("address_cropped", address_cropped);
      const query_diff = `SELECT * FROM marketsales.${
        address_cropped + "_differentials"
      };`;
      const query = `SELECT * FROM marketsales.${
        address_cropped + "_" + viewing_mode
      };`;
      queries.push(query);
      queries_diff.push(query_diff);
    });
    // start timer
    const start = new Date().getTime();
    let query = [];
    const collectionsCount = Object.keys(collections_dict).length;
    for (let i = 0; i < collectionsCount; i++) {
      query.push(prisma.$queryRaw(queries[i]));
    }
    for (let i = 0; i < collectionsCount; i++) {
      query.push(prisma.$queryRaw(queries_diff[i]));
    }
    // console.log("before answer ", query);
    const answer = await prisma.$transaction([...query]);
    console.log("answer ", answer);
    const split_1 = answer.slice(0, collectionsCount);
    const split_2 = answer.slice(collectionsCount, 2 * collectionsCount);
    const prices = [];
    const volumes = [];
    const counts = [];
    split_1.forEach((data) => {
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

    let deltas = [];
    split_2.forEach((element) => {
      element.forEach((littleman) => {
        if (viewing_mode == "alltime") {
          viewing_mode = "year";
        }
        if (littleman.view == viewing_mode) {
          deltas.push(parseFloat(littleman.differential));
        }
      });
    });

    // end timer
    const end = new Date().getTime();
    const time = end - start;
    console.log(`Time taken: ${time}ms`);

    res.status(201);
    // console.log("user: ", user);
    res.json({ prices, counts, volumes, deltas: deltas });
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
