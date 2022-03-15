import { nft, nft_collection } from "./data_types";
import sortNFTsByRarityInCollection from "./sort_nfts_by_rarity_in_collection";

export default function sortNftsIntoCollections(
  nfts: nft[],
  collection_filter: string[]
): nft_collection[] {
  const collections: { [key: string]: nft_collection } = {};
  for (const nft of nfts) {
    // if address is not in filter, skip
    if (!collection_filter.includes(nft.collection_address)) {
      const collection = nft.collection;
      if (!collections[collection]) {
        collections[collection] = {
          name: collection,
          address: nft.collection_address,
          description: "",
          image_url: "",
          external_url: "",
          market_cap: 0,
          nfts: [],
        };
      }
      collections[collection].nfts.push(nft);
    }
  }
  const sorted_collections = sortNFTsByRarityInCollection(
    Object.values(collections)
  );
  // console.log("sorted_collection : ", sorted_collections);
  // console.log("Object.values(collections) : ", Object.values(collections));
  return sorted_collections;
}
