import { nft, nft_collection } from "./data_types";

export default function sortNftsIntoCollections(nfts: nft[]): nft_collection[] {
  const collections: { [key: string]: nft_collection } = {};
  for (const nft of nfts) {
    const collection = nft.collection;
    if (!collections[collection]) {
      collections[collection] = {
        name: collection,
        description: "",
        image_url: "",
        external_url: "",
        market_cap: 0,
        nfts: [],
      };
    }
    collections[collection].nfts.push(nft);
  }
  return Object.values(collections);
}
