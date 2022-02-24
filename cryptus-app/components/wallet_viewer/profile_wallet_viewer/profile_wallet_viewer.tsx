import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import { useRouter } from "next/router";

import { nft_collection as coll, nft } from "../../../lib/data_types";

export default function ProfileWalletViewer(props: { collections: coll[] }) {
  return (
    <div className={s.container}>
      {props.collections.map((collection: coll, i) => (
        <Collection collection={collection} />
      ))}
    </div>
  );
}

const Collection = (props: { collection: coll }) => {
  const { collection } = props;
  const router = useRouter();
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  const [collectionName, setCollectionName] = useState("");

  useEffect(() => {
    const a = collection.nfts;
    const b = a.length > 3 ? a.slice(0, 3) : a;
    const c =
      a.length > 3 ? (a.length > 7 ? a.slice(3, 3 + 4) : a.slice(3)) : [];

    const collectionname = collection.name
      .replace(/[^0-9a-z]/gi, " ")
      .replace(/\s/g, "")
      .toLowerCase();

    setA(a);
    setB(b);
    setC(c);
    setCollectionName(collectionname);
  }, []);

  const onCollectionClick = (e) => {
    console.log(collectionName);
    //router.push(`/${collectionName}`);
  };

  return (
    <div className={s.collandname}>
      <div onClick={onCollectionClick} className={s.collection_container}>
        {b.map((nft) => (
          <NftL nft={nft} collectionName={collectionName} />
        ))}
        {c ? (
          <div className={s.collection_preview_container}>
            {c.map((nft) => (
              <NftS nft={nft} />
            ))}
          </div>
        ) : null}
      </div>
      <div className={s.collname}>{collection.name}</div>
    </div>
  );
};

const NftL = (props: { nft: nft; collectionName: string }) => {
  const { nft, collectionName } = props;
  const [urlName, setUrlName] = useState("");

  useEffect(() => {
    const urlname = nft.name
      .replace(/[^0-9a-z]/gi, " ")
      .replace(/\s/g, "")
      .toLowerCase();

    setUrlName(urlname);
  }, []);

  const onNftClick = (e) => {
    //router.push(`/${collectionName}/$urlName}`);
    console.log(urlName);

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    return false;
  };

  return (
    <div onClick={onNftClick} className={s.nft_container}>
      <img className={s.imglarge} src={nft.image_url} />
    </div>
  );
};

const NftS = (props: { nft: nft }) => {
  const { nft } = props;

  return (
    <div onClick={(e) => {}} className={s.nft_preview_container}>
      <img className={s.imgsmall} src={nft.image_url} />
    </div>
  );
};
