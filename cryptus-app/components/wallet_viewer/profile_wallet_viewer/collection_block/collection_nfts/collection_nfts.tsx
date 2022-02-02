import React, { useState, useEffect } from "react";
import s from "./collection_nfts.module.scss";

import NFT_picture_block_in_wallet from "./nft_picture_block_in_wallet/nft_picture_block_in_wallet"


export default function PageTemplate() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      NFTs are supposed to be here :
      <NFT_picture_block_in_wallet />
    </div>
  );
}
