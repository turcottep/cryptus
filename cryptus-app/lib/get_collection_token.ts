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

  // console.log(data.result);

  // const options = { method: "GET", headers: { Accept: "application/json" } };
  // const res = await fetch(
  //   "https://api.opensea.io/api/v1/collections?offset=0&limit=300",
  //   options
  // )
  //   .then((res) => res.json())
  //   .catch((err) => console.error(err));

  // console.log("Response : ", res);
  return data.result;
}
