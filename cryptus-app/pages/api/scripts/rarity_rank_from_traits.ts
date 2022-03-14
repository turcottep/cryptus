import { NextApiRequest, NextApiResponse } from "next";
import main from "../../../scripts/get_rarity_rank_of_nft";
import turcotte from "../../../public/turcotte";
import GetNameWithoutSpaces from "../../../lib/get_name_without_spaces";

export default async function (req: NextApiRequest, res: NextApiResponse) {
  try {
    // for (const collection of turcotte.collections) {
    //   console.log("Collection names : ", collection.name);
    //   try {
    //     await main(
    //       collection.nfts[0].collection_address,
    //       GetNameWithoutSpaces(collection.name)
    //     );
    //     await new Promise((resolve) => setTimeout(resolve, 10000));
    //   } catch (error) {
    //     console.log("An error occured...");
    //   }
    // }

    // await main("0x06012c8cf97bead5deae237070f9587f8e7a266d", "CryptoKitties");
    // await main(
    //   "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    //   "BoredApeYatchClub"
    // );
    // await main("0x2f2d5aa0efdb9ca3c9bb789693d06bebea88792f", "BlockCities");
    // await main("0xb47e3cd837dDF8e4c57F05d70Ab865de6e193BBB", "CryptoPunks");
    // await main("0x43b557b1f923f1cb4ecd05ff3beac7b933bedb46", "JustinRoiland");
    // await main("0x73da73ef3a6982109c4d5bdb0db9dd3e3783f313", "MyCurioCards");
    // await main("0x495f947276749ce646f68ac8c248420045cb7b5e", "SlayerX");
    await main("0x6fc355d4e0ee44b292e50878f49798ff755a5bbc", "DeadHeads");
    // await main("0x78f28143902e9346526933e3c2eda2662d1cd1f7", "DeadTickets");
    // await main("0x7645eec8bb51862a5aa855c40971b2877dae81af", "LONDONGIFTbyPOB");
    const data = { deez: "yo" };

    res.json(data);
  } catch (e) {
    res.status(500);
    console.error("There was an error up here", e);
    res.json({ error: "Unable to find data", e });
    console.error(e);
  }
  res.end();
}
