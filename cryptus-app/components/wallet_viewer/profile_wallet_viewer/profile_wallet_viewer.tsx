import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import Collection_block from "./collection_block/collection_block";
import { nft_collection, profile_props } from "../../../lib/data_types"


export default function ProfileWalletViewer(props: {collections: nft_collection[]}) {
  const { collections } = props;
  
  return (
      <div className={s.container}>
        {collections.map((collection: nft_collection, index: number) => (
          <div className={s.items} key={index}>
            <Collection_block nft={collection}/>
          </div>
        ))}
      </div>
  );
}
