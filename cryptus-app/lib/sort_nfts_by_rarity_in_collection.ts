import { nft, nft_collection } from "./data_types";

export default function sortNFTsByRarityInCollection(
  collections: nft_collection[]
) {
  const new_collections = collections.map((collection) => {
    return {
      name: collection.name,
      description: collection.description,
      image_url: collection.image_url,
      external_url: collection.external_url,
      market_cap: collection.market_cap,
      nfts: collection.nfts.sort((a, b) => {
        return b.rarity_rank - a.rarity_rank;
      }),
    };
  });

  return new_collections;
}
