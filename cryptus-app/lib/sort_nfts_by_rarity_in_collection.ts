import { nft, nft_collection } from "./data_types";

export default function sortNFTsByRarityInCollection(
  collections: nft_collection[]
) {
  const new_collections: nft_collection[] = [];

  for (const collection of collections) {
    const new_collection: nft_collection = {
      name: collection.name,
      description: collection.description,
      image_url: collection.image_url,
      external_url: collection.external_url,
      market_cap: collection.market_cap,
      nfts: [],
    };
    const new_nfts: nft[] = [];

    for (const nft of collection.nfts) {
      // trhough nfts of collection
      if (nft.properties.length > 0) {
        // check if props
        if (new_nfts.length == 0) {
          // if no nft added
          new_nfts.push(nft);
        } else {
          // if nft already there

          let rank_found: boolean = false;
          let rank: number = 0;
          new_nft_rank: for (const new_nft of new_nfts) {
            // check rank within added nfts

            if (nft.properties[0] < new_nft.properties[0]) {
              new_nfts.splice(rank, 0, nft);
              rank_found = true;
              break new_nft_rank;
            } else if (nft.properties[0] == new_nft.properties[0]) {
              rank_found = true;
              //code if equal here

              for (
                let index = 0;
                index <
                Math.min(nft.properties.length, new_nft.properties.length);
                index++
              ) {
                if (
                  nft.properties[index] < new_nft.properties[index] ||
                  index + 1 == new_nft.properties.length
                ) {
                  new_nfts.splice(rank, 0, nft);
                  rank_found = true;
                  break new_nft_rank;
                } else if (
                  nft.properties[index] > new_nft.properties[index] ||
                  index + 1 == nft.properties.length
                ) {
                  new_nfts.splice(rank + 1, 0, nft);
                  rank_found = true;
                  break new_nft_rank;
                }
              }

              break new_nft_rank;
            }

            if (!rank_found) {
              new_nfts.push(nft);
            }

            rank += 1;
          }

          // need to check the next one
        }
      } else {
        // if no props
        new_nfts.push(nft);
      }
    }
    new_collection.nfts = new_nfts;
    new_collections.push(new_collection);
  }
  console.log("First collection : ", new_collections[0]);
  return new_collections;
}
