export default async function getNFTListedPrice(
  contractaddress: string,
  token_id: string
) {
  const api_url = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;

  const url =
    "https://api.opensea.io/wyvern/v1/orders?asset_contract_address=" +
    contractaddress +
    "&bundled=false&include_bundled=false&token_id=" +
    token_id +
    "&side=1&limit=20&offset=0&order_by=eth_price&order_direction=asc";

  try {
    let listed_price: number = 0;

    const options = {
      method: "GET",
      headers: {
        Accept: "application/json",
        "X-API-KEY": api_url,
      },
    };

    const res = await fetch(url, options).then((response) => response.json());

    if (res.orders.length > 0) {
      listed_price = res.orders[0].base_price / 10 ** 18;
    }
    return listed_price;
  } catch (error) {
    console.log(error);
    return null;
  }
}
