//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

import { nft } from "../../../lib/data_types";

import NftHeader from "./nft_header/nft_header";
import NftInfo from "./nft_infos/nft_info";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";
import Card from "../../utils/card/card";

type nft_details_props = {
  nft: nft;
  isMobile: boolean;
  callback_close;
};

export default function NFTDetails(props: nft_details_props) {
  console.log("NFTDetails", props);

  const [[rank_position, rank_total], setRank] = useState([0, 0]);
  const [listed_price, set_listed_price] = useState(0.0);

  useEffect(() => {}, []);

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        <img className={s.image} src={props.nft.image_url} alt="nft" />
        <NftInfo
          nft={props.nft}
          listed_price={listed_price}
          estimated_price={props.nft.value}
        />
        {rank_position ? (
          <NFTRankInCollection position={rank_position} total={rank_total} />
        ) : null}

        <NFTProperties
          properties={props.nft.properties}
          collectionSize={rank_total}
        />
      </div>
    </Card>
  );
}
