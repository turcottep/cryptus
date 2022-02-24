import React, { useEffect, useState } from "react";
import s from "./collection_details.module.scss";

import Header from "../../header/header";
import CollectionInfos from "./collection_infos/collection_infos";
import CollectionViewer from "./collection_viewer/collection_viewer";
import { collection } from "../../market_viewer/market_viewer";
import CollectionHeader from "./collection_header/collection_header";

export interface nft {
  name: string;
  nft: string;
  id: string;
}

const CP1: nft = {
  name: "CryptoPunk #9998",
  nft: "/images/cryptopunk.png",
  id: "1",
};

const CP2: nft = {
  name: "CryptoPunk #9998",
  nft: "/images/cryptopunk.png",
  id: "2",
};

const CP3: nft = {
  name: "CryptoPunk #9998",
  nft: "/images/cryptopunk.png",
  id: "3",
};

const CP4: nft = {
  name: "CryptoPunk #9998",
  nft: "/images/cryptopunk.png",
  id: "4",
};

const CP5: nft = {
  name: "CryptoPunk #9998",
  nft: "/images/cryptopunk.png",
  id: "5",
};

//Need to add prop for collection
export default function CollectionDetails(props: { collection }) {
  const user_nfts: nft[] = [CP1, CP2, CP3, CP4, CP5];
  return (
    <div className={s.container}>
      <CollectionHeader />
      <div className={s.infos}>
        <CollectionInfos name="CryptoPunks" number={5} />
      </div>
      <div className={s.viewer}>
        <CollectionViewer collection={user_nfts} />
      </div>
    </div>
  );
}
