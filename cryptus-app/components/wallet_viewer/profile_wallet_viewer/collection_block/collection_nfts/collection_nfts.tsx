import React, { useState, useEffect } from "react";
import s from "./collection_nfts.module.scss";

//external imports

//internal imports
import NFT_picture_block_in_wallet from "./nft_picture_block_in_wallet/nft_picture_block_in_wallet"
import { nft } from "../../../../../lib/data_types"


export default function PageTemplate(props: { nft: nft }) {
  const { nft } = props;
  

  return (
    <div className={s.container}>

      <div className={s.block}>
        <div className={s.grid2x2}>

          <div>
            <NFT_picture_block_in_wallet {...props} size={s.img_b}/>
          </div>

          <div>
          <NFT_picture_block_in_wallet {...props} size={s.img_b}/>
          </div>

          <div>
          <NFT_picture_block_in_wallet {...props} size={s.img_b}/>
          </div>

          <div>
            <div className={s.grid2x2}>
              <div>
              <NFT_picture_block_in_wallet {...props} size={s.img_s}/>
              </div>

              <div>
              <NFT_picture_block_in_wallet {...props} size={s.img_s}/>
              </div>

              <div>
              <NFT_picture_block_in_wallet {...props} size={s.img_s}/>
              </div>

              <div>
              <NFT_picture_block_in_wallet {...props} size={s.img_s}/>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
