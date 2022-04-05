import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { nft, nft_collection } from "../../../../lib/data_types";
import s from "./collection_viewer.module.scss";

export default function CollectionViewer(props: {
  collection: nft_collection;
  open_nft: (collection_name: string, token_id: string) => void;
}) {
  const { collection } = props;
  return (
    <div className={s.container}>
      {collection.nfts.map((nft, i) => (
        <Nft key={i} nft={nft} index={i} open_nft={props.open_nft} />
      ))}
    </div>
  );
}

const Nft = (props: { nft: nft; index: number; open_nft }) => {
  const { nft } = props;
  //console.log("nft", nft);
  // const router = useRouter();
  // const { userId: userName, collectionId: collectionName } = router.query;

  // const nftName = nft.name
  //   .replace(/[^0-9a-z]/gi, " ")
  //   .replace(/\s/g, "")
  //   .toLowerCase();

  const onNftClick = () => {
    props.open_nft(nft.collection, nft.token_id);
    // router.push(`/${userName}/${collectionName}/${nftName}`);
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
