import React, { useState, useEffect } from "react";
import s from "./profile.module.scss";

import { nft, nft_collection } from "../../../lib/data_types";
import collections_dict from "../../../lib/collectionDictionary";

import { AppHeader, Modifiers } from "../market/market";
import ProfileWalletViewer from "../../profile/wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";

export default function Profile(props: {
  collections: nft_collection[];
  user: any;
  //make f an array of functions
  f: Function[];
}) {
  const { collections, user, f } = props;

  return (
    <div className={s.profile}>
      <AppHeader />
      <div className={s.top}>
        <div className={s.tile}>
          <div className={s.logo}>
            <img src={user.profile_image_url} className={s.logoimg} />
          </div>
          <div className={s.name}>{user.username}</div>
          <div className={s.keystat}>{user.description}</div>
        </div>
        <div className={s.icons}>buttons</div>
      </div>

      <Modifiers />
      <div className={s.collections}>
        {collections.map((collection: nft_collection, i: number) => (
          <div key={i}>
            <Collection
              collection={collection}
              f={f} // [setOpenCollection, setCollectionName, setNftTokenId]
              key={i}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const Collection = (props: { collection: any; f: Function[] }) => {
  const { collection, f } = props;

  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);

  useEffect(() => {
    let a = collection.nfts;
    let b = a.length > 3 ? a.slice(0, 3) : a;
    let c = a.length > 3 ? (a.length > 7 ? a.slice(3, 3 + 4) : a.slice(3)) : [];
    setA(a);
    setB(b);
    setC(c);
  }, []);

  const onCollectionClick = () => {
    try {
      let coll = collection.name
        .replace(/[^0-9a-z]/gi, " ")
        .replace(/\s/g, "")
        .toLowerCase();

      f[1](coll);
      f[0](3);
      console.log("collection clicked!", coll);
    } catch (error) {
      console.log("collection name is empty", error);
    }
  };
  //set e as an event
  const onNftClick = (e, tokenId) => {
    try {
      let coll = collection.name
        .replace(/[^0-9a-z]/gi, " ")
        .replace(/\s/g, "")
        .toLowerCase();
      let nft = tokenId
        .replace(/[^0-9a-z]/gi, " ")
        .replace(/\s/g, "")
        .toLowerCase();

      f[1](coll);
      f[2](nft);
      f[0](4);
      console.log("nft clicked!", coll, nft);
    } catch (error) {
      console.log("collection name is empty", error);
    }
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  };

  return (
    <div className={s.collandname}>
      {collection.nfts.length == 1 ? (
        <div
          onClick={(e) => onNftClick(e, collection.nfts[0].token_id)}
          className={s.collection_container2}
        >
          {collection.nfts[0].image_url ? (
            <img className={s.imglarge} src={collection.nfts[0].image_url} />
          ) : (
            <div className={s.imglarge_loading} />
          )}
        </div>
      ) : (
        <div onClick={onCollectionClick} className={s.collection_container}>
          {b.map((nft, i) => (
            <div
              onClick={(e) => onNftClick(e, nft.token_id)}
              className={s.nft_container}
            >
              {nft.image_url ? (
                <img className={s.imglarge} src={nft.image_url} />
              ) : (
                <div className={s.imglarge_loading} />
              )}
            </div>
          ))}
          {c ? (
            <div className={s.collection_preview_container}>
              {c.map((nft, i) => (
                <div className={s.nft_preview_container}>
                  <img className={s.imgsmall} src={nft.image_url} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      )}
      <div className={s.collname}>{collection.name}</div>
    </div>
  );
};
