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
      let rank_found: boolean = false;
      let rank: number = 0;
      // const nft_properties = JSON.parse(nft.properties);
      const nft_properties = nft.properties;
      // trhough nfts of collection
      if (nft_properties.length > 0) {
        // check if props
        if (new_nfts.length == 0) {
          // if no nft added
          new_nfts.push(nft);
          rank_found = true;
        } else {
          // if nft already there

          new_nft_rank: for (const new_nft of new_nfts) {
            // check rank within added nfts+
            // const new_nft_properties = JSON.parse(new_nft.properties);
            const new_nft_properties = new_nft.properties;
            if (new_nft_properties.length > 0) {
              if (nft_properties[0].rarity < new_nft_properties[0].rarity) {
                new_nfts.splice(rank, 0, nft);
                rank_found = true;
                break new_nft_rank;
              } else if (
                nft_properties[0].rarity == new_nft_properties[0].rarity
              ) {
                rank_found = true;
                //code if equal here

                for (
                  let index = 0;
                  index <
                  Math.min(nft_properties.length, new_nft_properties.length);
                  index++
                ) {
                  if (
                    nft_properties[index].rarity <
                      new_nft_properties[index].rarity ||
                    index + 1 == new_nft_properties.length
                  ) {
                    new_nfts.splice(rank, 0, nft);
                    rank_found = true;
                    break new_nft_rank;
                  } else if (
                    nft_properties[index].rarity >
                      new_nft_properties[index].rarity ||
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
                rank_found = true;
                // console.log("first_nft_pushed", nft);
                break new_nft_rank;
              }

              rank += 1;
            }
          }

          // need to check the next one
        }
      } else {
        // if no props
        new_nfts.push(nft);
        rank_found = true;
      }
    }
    new_collection.nfts = new_nfts;
    new_collections.push(new_collection);
  }

  console.log("New_collection : ", new_collections[0]);

  // TODO: putting back in Json.stringnify to simplify js.file

  return new_collections;
}
