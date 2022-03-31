import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import { useRouter } from "next/router";

import { nft, nft_collection } from "../../../lib/data_types";

export default function ProfileWalletViewer(props: {
  collections: nft_collection[];
  open_collection: (index: number) => void;
  open_nft: (index: number) => void;
  collections_filter: string[];
}) {
  console.log("ProfileWalletViewer render");

  return (
    <div className={s.container}>
      {props.collections
        .filter((collection) => {
          return !props.collections_filter.includes(collection.address);
        })
        .map((collection: nft_collection, i: number) => (
          <div key={collection.id}>
            <Collection
              collection={collection}
              index={i}
              open_collection={props.open_collection}
              open_nft={props.open_nft}
            />
          </div>
        ))}
    </div>
  );
}

const Collection = (props: {
  collection: nft_collection;
  index: number;
  open_collection;
  open_nft;
}) => {
  const { collection } = props;
  const router = useRouter();
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  const [collectionName, setCollectionName] = useState("");
  const { userId } = router.query;

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

  const onCollectionClick = () => {
    // const pushurl = `/${userId}/${collectionName}`;
    // console.log("pushurl", pushurl);
    // router.push(pushurl);
    props.open_collection(props.index);
  };

  return (
    <div className={s.collandname}>
      <div onClick={onCollectionClick} className={s.collection_container}>
        {b.map((nft, i) => (
          <NftL
            nft={nft}
            collectionName={collectionName}
            index={i}
            open_nft={props.open_nft}
          />
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
      <div className={s.collname}>
        {collection.value ? `VALUE:${collection.value} eth` : ""}
      </div>
    </div>
  );
};

const NftL = (props: {
  nft: nft;
  collectionName: string;
  index: number;
  open_nft;
}) => {
  const { nft, collectionName } = props;
  const [urlName, setUrlName] = useState("");
  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const urlname = nft.name
      .replace(/[^0-9a-z]/gi, " ")
      .replace(/\s/g, "")
      .toLowerCase();

    setUrlName(urlname);
  }, []);

  const onNftClick = (e) => {
    // router.push(`${userId}/${collectionName}/${urlName}`);
    // console.log(urlName);
    props.open_nft(props.index);

    // e.preventDefault();
    // e.stopPropagation();
    // e.nativeEvent.stopImmediatePropagation();
    // return false;
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
