import React, { useState, useEffect } from "react";
import s from "./collection_block.module.scss";

import Collection_nfts from "./collection_nfts/collection_nfts";
import Collection_block_name from "./collection_block_name/collection_block_name";

//external imports

//internal imports
import { nft } from "../../../../lib/data_types"

export default function Collection_block(props: { nft: nft }) {
  const { nft } = props;

  return (
    <div className={s.app}>
      <div>
        <Collection_nfts {...props}/>
        <Collection_block_name {...props}/>
      </div>      
    </div>
  );
}
