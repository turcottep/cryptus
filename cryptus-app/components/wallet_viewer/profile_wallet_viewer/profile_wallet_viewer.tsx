import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import Collection_block from "./collection_block/collection_block";
import { nft } from "../../../lib/data_types"

type nft_props = {
  nft: nft,
};

export default function PageTemplate(props: nft_props) {

  return (
    <div className={s.app}>

      <div className={s.container}>
        <div className={s.items}>
          <Collection_block {...props}/>
        </div>
        <div className={s.items}>
          <Collection_block {...props}/>
        </div>
        <div className={s.items}>
          <Collection_block {...props}/>
        </div>
      </div>
    </div>
  );
}
