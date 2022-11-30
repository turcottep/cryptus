import { nft } from "./data_types";

export default async function get_collections_in_wallet(address: string) {
  let res;
  let collections_raw = [];

  try {
    //fetch nfts from opensea
    for (let i = 0; i < 10; i++) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      res = await fetch(
        "https://api.opensea.io/api/v1/collections?asset_owner=" +
          address +
          "&limit=100&offset=" +
          (i * 100).toString(),
        {
          headers: {
            Accept: "application/json",
            "X-API-KEY": process.env.NEXT_PUBLIC_OPENSEA_API_KEY,
          },
        }
      );
      // res = await fetch(wallet.external_url);
      const data = await res.json();
      console.log("Collections", data);
      if (data.length == 0) break;
      collections_raw.push(...data);
    }
  } catch (err) {
    console.error(err);
    console.log("response = ", res);
    return null;
  }
  // let good_collections = [];
  // console.log("Before filter", collections_raw);
  // good_collections = collections_raw.filter(
  //   (coll) => coll.stats.total_volume > 0.001
  // );
  // console.log("After filter", good_collections);
  let collections_raw_sfw;
  collections_raw_sfw = collections_raw.filter((coll) => coll.is_nsfw != true);
  collections_raw_sfw.sort(function (a, b) {
    return b.stats.total_volume - a.stats.total_volume;
  });
  console.log("COLLECTIONS RAW", collections_raw_sfw);
  return collections_raw_sfw;
}
