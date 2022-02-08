import React, { useState, useEffect } from "react";
import s from "./collection_block.module.scss";

import Collection_nfts from "./collection_nfts/collection_nfts";

//external imports

//internal imports
import { nft, nft_collection } from "../../../../lib/data_types"

export default function CollectionBlock(props: { nft: nft_collection }) {
  const { nft } = props;

  return (
    <div className={s.container}>
      <div>
        <Collection_nfts nft={nft.nfts}/>
        <div className={s.collection_name}>
          {nft.name}
        </div>
      </div>      
    </div>
  );
}
