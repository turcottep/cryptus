//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_details.module.scss";

import { nft } from "../../../lib/data_types";

import NftHeader from "./nft_header/nft_header";
import NftInfo from "./nft_infos/nft_info";
import NftPicture from "./nft_picture/nft_picture";
import NFTProperties from "./nft_properties/nft_properties";
import NFTRankInCollection from "./nft_rank_in_collection/nft_rank_in_collection";
import DesktopHeader from "../../header/desktop_header/desktop_header";
import Card from "../../utils/card/card";

type nft_details_props = {
  nft: nft;
  rank: {
    position: number;
    total: number;
  };
  listed_price: number;
  isMobile: boolean;
  callback_close;
};

export default function NFTDetails(props: nft_details_props) {
  const { nft, rank, listed_price, isMobile } = props;
  let properties = nft.properties;

  return (
    <Card callback_close={props.callback_close}>
      {/* {isMobile ? null : <DesktopHeader tab="profile" />}
      <NftHeader /> */}
      <NftPicture image_url={nft.image_url} description={nft.description} />
      <NftInfo nft={props.nft} listed_price={listed_price} />
      {rank.position ? (
        <NFTRankInCollection position={rank.position} total={rank.total} />
      ) : null}

      <NFTProperties properties={properties} collectionSize={rank.total} />
    </Card>
  );
}
