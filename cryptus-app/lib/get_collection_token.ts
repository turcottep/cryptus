export default async function getCollectionToken(contractaddress: string) {
  const api_url = process.env.ETHERSCAN_API_KEY;

  const url =
    "https://api.etherscan.io/api" +
    "?module=stats" +
    "&action=tokensupply" +
    "&contractaddress=" +
    contractaddress +
    "&apikey=" +
    api_url;

  const response = await fetch(url, { method: "POST", body: "a=1" });
  const data = await response.json();

  return data;
}
