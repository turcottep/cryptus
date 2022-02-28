//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

import { nft } from "../../../lib/data_types";

import NftHeader from "./nft_header/nft_header";
import NftInfo from "./nft_infos/nft_info";
import NftPicture from "./nft_picture/nft_picture";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";
import GetCollectionTokens from "../../../lib/get_collection_token";

type nft_details_props = {
  nft: nft;
  rank: {
    position: number;
    total: number;
  };
};

export default function NFTDetails(props: nft_details_props) {
  const { nft, rank } = props;
  let properties = nft.properties;

  let [collection_size, setCollection_size] = useState(Number);
  let [rarity_rank, setraRity_rank] = useState(Number);

  useEffect(() => {
    const collectionCall = async () => {
      try {
        const collectionSize: number = await GetCollectionTokens(
          nft.collection_address
        );
        setCollection_size(collectionSize);
        // Rarity rank is calculated from it's traits and rounded the result. The equation is :sum(1/(nb_with_trait/total_count))
        const sorted_traits = nft.properties.sort((a, b) => {
          return a.count - b.count;
        });
        const rarity = Math.round(
          sorted_traits
            .map((trait) => {
              trait.rarity = trait.count / collectionSize;
              return 1 / trait.rarity;
            })
            .reduce((partialSum, a) => partialSum + a, 0)
        );
        setraRity_rank(rarity);

        console.log("rarity : ", rarity);
        console.log("collection_size : ", collectionSize);
      } catch (error) {
        console.log(error);
      }
    };
    collectionCall();
  }, []);

  return (
    <div className={s.container}>
      <NftHeader />
      <NftPicture image_url={nft.image_url} description={nft.description} />
      <NftInfo {...props} />
      <NFTRankInCollection position={rarity_rank} total={collection_size} />
      <NFTProperties properties={properties} />
    </div>
  );
}
