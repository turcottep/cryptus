//react and css
import React from "react";
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
};

export default function NFTDetails(props: nft_details_props) {
  const { nft, rank } = props;

  return (
    <div className={s.container}>
      <NftHeader />
      <NftPicture image_url={nft.image_url} description={nft.description} />
      <NftInfo {...props} />
      <NFTRankInCollection position={rank.position} total={rank.total} />
      <NFTProperties properties={nft.properties} />
    </div>
  );
}
