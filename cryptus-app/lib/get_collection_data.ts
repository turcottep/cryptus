import GetNameWithoutSpaces from "./get_name_without_spaces";

async function getCollectionData(collectionAddress: string[]) {
  const opensea_api_key = process.env.OPENSEA_API_KEY;
  let response;
  let collectionDataList = [];
  for (const collection of collectionAddress) {
    const contractAddress = collection;
    try {
      const url =
        "https://api.opensea.io/api/v1/assets?order_direction=desc&asset_contract_address=" +
        contractAddress +
        "&limit=1&include_orders=false";

      response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": opensea_api_key,
        },
      });
      const data = (await response.json()) as any;

      const ticker = data.assets[0].asset_contract.symbol;
      const logo = data.assets[0].asset_contract.image_url;
      const address = data.assets[0].asset_contract.address;
      const name = data.assets[0].collection.name;

      const nameWithoutSpaces = GetNameWithoutSpaces(name);

      collectionDataList.push({
        [nameWithoutSpaces]: { ticker, logo, address, name },
      });
    } catch (error) {
      console.log("response", response);
      console.log(error);
      return null;
    }
  }
  return collectionDataList;
}

export default getCollectionData;
