import React, { useState, useEffect } from "react";
import s from "./collection_block.module.scss";

import Collection_nfts from "./collection_nfts/collection_nfts";
import Collection_block_name from "./collection_block_name/collection_block_name";

//external imports

//internal imports
import { nft, nft_collection } from "../../../../lib/data_types"

export default function CollectionBlock(props: { nft: nft_collection }) {
  const { nft } = props;

  return (
    <div className={s.container}>
      <div>
        <Collection_nfts nft={nft.nfts}/>
        <Collection_block_name name={nft.name}/>
      </div>      
    </div>
  );
}
