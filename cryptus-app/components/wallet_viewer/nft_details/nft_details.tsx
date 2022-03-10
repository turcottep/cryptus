//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

import { nft } from "../../../lib/data_types";

import NftHeader from "./nft_header/nft_header";
import NftInfo from "./nft_infos/nft_info";
import NftPicture from "./nft_picture/nft_picture";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";

type nft_details_props = {
  nft: nft;
  rank: {
    position: number;
    total: number;
  };
  listed_price: number;
};

export default function NFTDetails(props: nft_details_props) {
  const { nft, rank, listed_price } = props;
  let properties = nft.properties.sort((a, b) => {
    return a.count - b.count;
  });

  return (
    <div className={s.container}>
      <NftHeader />
      <NftPicture image_url={nft.image_url} description={nft.description} />
      <NftInfo nft={props.nft} listed_price={listed_price} />
      <NFTRankInCollection position={rank.position} total={rank.total} />
      <NFTProperties properties={properties} collectionSize={rank.total} />
    </div>
  );
}
