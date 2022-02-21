import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import Collection_block from "./collection_block/collection_block";
import { nft_collection } from "../../../lib/data_types";

export default function ProfileWalletViewer(props: {
  collections: nft_collection[];
}) {
  return (
    <div className={s.container}>
      {props.collections.map((collection: nft_collection, index: number) => (
        <Collection_block nft={collection} key={index} />
      ))}
    </div>
  );
}
