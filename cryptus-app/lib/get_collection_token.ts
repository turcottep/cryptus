export default async function getCollectionToken(contractaddress: string) {
  const url =
    "https://api.etherscan.io/api" +
    "?module=stats" +
    "&action=tokensupply" +
    "&contractaddress=" +
    contractaddress +
    "&apikey=7CKI7M6YS4TBYYNK47VK9KTJDFV1254BV4";

  const response = await fetch(url, { method: "POST", body: "a=1" });
  const data = await response.json();

  // console.log(data.result);

  return data.result;
}
