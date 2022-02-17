import React, { useEffect, useState } from "react";
import s from "./collection_viewer.module.scss";

import NftBlock from "./nft_block/nft_block"

import { nft } from "../collection_details";

export default function CollectionViewer(props: { collection: nft[] }) {
  const {collection} = props
  return (
    <div className={s.container}>
      {collection.map(({ name, nft, id }) => (
        <div key={id} className={s.block}>
          <NftBlock name={name} nft={nft}/>
        </div>
      ))}
    </div>
  );
}