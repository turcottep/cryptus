import { nft, nft_collection } from "./data_types";
import sortNFTsByRarityInCollection from "./sort_nfts_by_rarity_in_collection";

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
  const sorted_collections = sortNFTsByRarityInCollection(
    Object.values(collections)
  );
  // console.log("sorted_collection : ", sorted_collections);
  // console.log("Object.values(collections) : ", Object.values(collections));
  return sorted_collections;
}
