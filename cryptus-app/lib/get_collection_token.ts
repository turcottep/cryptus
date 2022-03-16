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

export default getCollectionTokenWithEtherscan;
