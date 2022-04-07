async function getCollectionFloorPriceWithOpensea(collectionAddress: string) {
  const api_url = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
  let response;
  console.log("collectionAddress", collectionAddress);
  try {
    const url =
      "https://api.opensea.io/api/v1/assets?order_direction=desc&asset_contract_address=" +
      collectionAddress +
      "&limit=1&include_orders=false";

    response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": api_url,
      },
    });
    const slug = (await response.json()).assets[0].collection.slug as string;

    const url_slug =
      "https://api.opensea.io/api/v1/collection/" + slug + "/stats";

    response = await fetch(url_slug, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": api_url,
      },
    });
    const floor_price = (await response.json()) as any;
    // wait 1 second to avoid rate limit
    await new Promise((resolve) => setTimeout(resolve, 500));

    return Number(floor_price.stats.floor_price);
  } catch (error) {
    console.log("response", response);
    console.log(error);
    return null;
  }
}

export default getCollectionFloorPriceWithOpensea;
