export default async function getNFTListedPrice(
  contractaddress: string,
  token_id: string
) {
  const api_url = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
  // console.log("contractaddress", contractaddress, "token_id", token_id);

  const url = `https://api.opensea.io/api/v1/assets?token_ids=${token_id}&asset_contract_address=${contractaddress}&order_direction=desc&limit=1&include_orders=true`;

  try {
    let listed_price = null;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": api_url,
      },
    };

    const res = await fetch(url, options).then((response) => response.json());

    // console.log("res", res);

    if (res.assets.length > 0) {
      if (res.assets[0].sell_orders) {
        listed_price = res.assets[0].sell_orders[0].price / 1000000000000000000;
      }
    }

    return listed_price;
  } catch (error) {
    console.log(error);
    return null;
  }
}
