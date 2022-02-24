//react and css
import React, { useState, useEffect } from "react";
import s from "./nft_picture_block_in_wallet.module.scss";

//external imports

//internal imports
import { nft } from "../../../../../../lib/data_types";

export default function NFTPictureBlockInWallet(props: {
  nft: nft;
  size: string;
}) {
  const { nft, size } = props;

  return (
    <div className={s.image}>
      <img className={size} src={nft.image_url} alt={nft.description} />
    </div>
  );
}
