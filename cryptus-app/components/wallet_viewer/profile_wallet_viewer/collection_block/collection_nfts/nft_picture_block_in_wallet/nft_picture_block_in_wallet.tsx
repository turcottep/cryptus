import React, { useState, useEffect } from "react";
import s from "./nft_picture_block_in_wallet.module.scss";


export default function nft_picture_block_in_wallet() {
  const [myNumberState, setMyNumberState] = useState<Number>(0);
  useEffect(() => {}, []);

  return (
    <div className={s.app}>
      <div className={s.rectangle}>NFT</div>
    </div>
  );
}
