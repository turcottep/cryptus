import React, { useState, useEffect } from "react";
import s from "./collection_block.module.scss";

//external imports

//internal imports
import Collection_nfts from "./collection_nfts/collection_nfts";
import { nft_collection } from "../../../../lib/data_types";

export default function CollectionBlock(props: { nft: nft_collection }) {
  return (
    <div className={s.container}>
      <Collection_nfts nft={props.nft.nfts} />
      <div className={s.collection_name}>{props.nft.name}</div>
    </div>
  );
}
