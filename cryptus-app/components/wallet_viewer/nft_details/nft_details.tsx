//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

//external exports

//internal imports
import { nft } from "../../../lib/data_types";

import NftHeader from "./nft_header/nft_header";
import NftInfo from "./nft_infos/nft_info";
import NftPicture from "./nft_picture/nft_picture";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";

type nft_details_props = {
  nft: nft;
  rank_props: {
    position: number;
    total: number;
  };
};

export default function NFTDetails(props: nft_details_props) {
  return (
    <div className={s.container}>
      <NftHeader />
      <NftPicture
        image_url={props.nft.image_url}
        description={props.nft.description}
      />
      <NftInfo {...props} />
      <NFTRankInCollection
        position={props.rank_props.position}
        total={props.rank_props.total}
      />
      <NFTProperties
        properties_string={props.nft.properties}
        collection_size={props.rank_props.total}
      />
    </div>
  );
}
