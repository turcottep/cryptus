import { NextApiRequest, NextApiResponse } from "next";
import main from "../../../../scripts/get_attributes_from_collection";
import prisma from "../../../../lib/prisma";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  //check for bearer token == "DEEZ"
  // if (req.headers.authorization !== "Bearer DEEZ") {
  //   console.log("bearer", req.headers.authorization);

  //   res.status(401).json({ message: "Unauthorized" });
  //   return;
  // }

  try {
    console.log("starting timer...");
    const address = req.query.address as string;
    console.log("address", address);

    // const contract_address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";

    const trait_floor_dict = await main(address);

    console.log("saving to db...");

    await prisma.collectiontraitfloor.upsert({
      where: {
        address: address,
      },
      update: {
        trait_floor_dict: trait_floor_dict,
      },
      create: {
        address: address,
        trait_floor_dict: trait_floor_dict,
      },
    });

    console.log("done");

    const data = { trait_floor_dict: trait_floor_dict };

    // console.log("user: ", user);
    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
  res.end();
}
