import React, { useState, useEffect } from "react";
import s from "./collection_nfts.module.scss";

//external imports

//internal imports
import NFT_picture_block_in_wallet from "./nft_picture_block_in_wallet/nft_picture_block_in_wallet";
import { nft, nft_collection } from "../../../../../lib/data_types";

export default function CollectionNFTs(props: { nft: nft[] }) {
  const empty_nft = {
    id: 0,
    collection: "",
    name: "",
    description: "",
    external_url: "",
    image_url: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    properties: "",
    last_sale_price: 0,
    last_sale_symbol: "",
    rarity_rank: 0,
    collection_size: 0,
  } as nft;

  const { nft } = props;
  const nfts = [
    empty_nft,
    empty_nft,
    empty_nft,
    empty_nft,
    empty_nft,
    empty_nft,
    empty_nft,
  ];

  nft.forEach((item, index) => {
    if (index < nfts.length) {
      nfts[index] = item;
    }
  });

  const nfts_b = nfts.slice(0, 3);
  const nfts_s = nfts.slice(3, 7);

  return (
    <div className={s.container}>
      <div className={s.block}>
        <div className={s.grid2x2}>
          {nfts_b.map((nft: nft, index: number) => (
            <div key={index}>
              <NFT_picture_block_in_wallet nft={nft} size={s.img_b} />
            </div>
          ))}

          <div>
            <div className={s.grid2x2}>
              {nfts_s.map((nft: nft, index: number) => (
                <div key={index}>
                  <NFT_picture_block_in_wallet nft={nft} size={s.img_s} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
