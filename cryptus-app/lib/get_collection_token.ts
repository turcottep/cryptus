// import Moralis from "moralis/node";

// async function getCollectionTokenWithMoralis(contractaddress: string) {
// try {
// const Moralis = require("moralis/node");
//   const serverUrl = "https://7n8el022vvrd.usemoralis.com:2053/server";
//   const appId = "I1l0EVLEqlVx64E44bKf2ytSOzIUSSAqlNlJ5Ijd";
//   Moralis.start({ serverUrl, appId });
//   const nfts = (await Moralis.Web3API.token.getAllTokenIds({
//     address: contractaddress,
//   })) as any;
//   return nfts.total;
// } catch (error) {
//   console.log(error);
//   return null;
// }
// }

async function getCollectionTokenWithEtherscan(contractaddress: string) {
  const api_url = process.env.NEXT_PUBLIC_ETHERSCAN_API_KEY;

  const url =
    "https://api.etherscan.io/api" +
    "?module=stats" +
    "&action=tokensupply" +
    "&contractaddress=" +
    contractaddress +
    "&apikey=" +
    api_url;

  try {
    const response = await fetch(url, { method: "POST", body: "a=1" });
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

async function getCollectionTokenWithOpensea(collectionAddress: string) {
  const api_url = process.env.OPENSEA_API_KEY;
  let response;
  for (let i = 0; i < 1; i++) {
    try {
      const url =
        "https://api.opensea.io/api/v1/asset/" +
        collectionAddress +
        "/1/?include_orders=false";

      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": api_url,
        },
      });
      const data = (await response.json()) as any;
      // await new Promise((resolve) => setTimeout(resolve, 1000));
      return Number(data.collection.stats.count);
    } catch (error) {
      console.log("response", response);
      console.log(error);
      return null;
    }
  }
}

export default getCollectionTokenWithOpensea;
