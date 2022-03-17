import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { nft, nft_collection } from "../../../../lib/data_types";
import s from "./collection_viewer.module.scss";

export default function CollectionViewer(props: {
  collection: nft_collection;
}) {
  const { collection } = props;
  return (
    <div className={s.container}>
      {collection.nfts.map((nft, i) => (
        <Nft key={i} nft={nft} />
      ))}
    </div>
  );
}

const Nft = (props: { nft: nft }) => {
  const { nft } = props;
  //console.log("nft", nft);
  const router = useRouter();
  const { userId: userName, collectionId: collectionName } = router.query;

  const nftName = nft.name
    .replace(/[^0-9a-z]/gi, " ")
    .replace(/\s/g, "")
    .toLowerCase();

  const onNftClick = () => {
    router.push(`/${userName}/${collectionName}/${nftName}`);
  };

  return (
    <div className={s.collandname}>
      <div onClick={onNftClick} className={s.nft_container}>
        <img className={s.imglarge} src={nft.image_url} />
      </div>
      <div className={s.collname}>{nft.name}</div>
    </div>
  );
};
