import React, { useEffect, useState } from "react";
import s from "./collection_viewer.module.scss";

import NftBlock from "./nft_block/nft_block"

//Need to add prop for collection
export default function CollectionViewer() {
  const collection = [
    {name: "CryptoPunk #9998", nft:"images/cryptopunk.png", id:"1"},
    {name: "CryptoPunk #9998", nft:"images/cryptopunk.png", id:"2"},
    {name: "CryptoPunk #9998", nft:"images/cryptopunk.png", id:"3"},
    {name: "CryptoPunk #9998", nft:"images/cryptopunk.png", id:"4"},
    {name: "CryptoPunk #9998", nft:"images/cryptopunk.png", id:"5"},
  ];
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