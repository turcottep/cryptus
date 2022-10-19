import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import { useRouter } from "next/router";

import { nft, nft_collection } from "../../../../lib/data_types";
import collections_dict from "../../../../lib/collectionDictionary";

export default function ProfileWalletViewer(props: {
  collections: nft_collection[];
  open_collection: (collection_name: string) => void;
  open_nft: (collection_name: string, nft_token_id: string) => void;
  collections_filter: string[];
}) {
  const top_collections_address_list = Object.keys(collections_dict).map(
    (key) => collections_dict[key].address.toLowerCase()
  );

  console.log("collections", props.collections);

  // console.log("index of ");

  return (
    <div className={s.container}>
      {props.collections
        .filter((collection) => {
          return !props.collections_filter.includes(collection.address);
        })
        .sort((a, b) => {
          return (
            top_collections_address_list.indexOf(b.address.toLowerCase()) -
            top_collections_address_list.indexOf(a.address.toLowerCase())
          );
        })
        .map((collection: nft_collection, i: number) => (
          <div key={i}>
            <Collection
              collection={collection}
              key={i}
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
  open_collection;
  open_nft;
}) => {
  const { collection } = props;
  const router = useRouter();
  const [a, setA] = useState([]);
  const [b, setB] = useState([]);
  const [c, setC] = useState([]);
  // const [collectionName, setCollectionName] = useState("");
  const { userId } = router.query;

  useEffect(() => {
    const a = collection.nfts;
    const b = a.length > 3 ? a.slice(0, 3) : a;
    const c =
      a.length > 3 ? (a.length > 7 ? a.slice(3, 3 + 4) : a.slice(3)) : [];

    // const collectionname = collection.name
    //   .replace(/[^0-9a-z]/gi, " ")
    //   .replace(/\s/g, "")
    //   .toLowerCase();

    setA(a);
    setB(b);
    setC(c);
    // setCollectionName(collectionname);
  }, []);

  const onCollectionClick = () => {
    // const pushurl = `/${userId}/${collectionName}`;
    // console.log("pushurl", pushurl);
    // router.push(pushurl);
    if (props.collection.name != "") {
      props.open_collection(props.collection.name);
    } else {
      console.log("collection name is empty");
    }
  };

  if (collection.nfts.length == 1) {
    const nft = collection.nfts[0];
    return (
      <div className={s.collandname}>
        <NftXl
          nft={nft}
          collectionName={collection.name}
          key={0}
          open_nft={props.open_nft}
        />
        <div className={s.collname}>{collection.name}</div>
        <div className={s.collname}></div>
      </div>
    );
  }

  return (
    <div className={s.collandname}>
      <div onClick={onCollectionClick} className={s.collection_container}>
        {b.map((nft, i) => (
          <NftL
            nft={nft}
            collectionName={collection.name}
            key={i}
            open_nft={props.open_nft}
          />
        ))}
        {c ? (
          <div className={s.collection_preview_container}>
            {c.map((nft, i) => (
              <NftS nft={nft} key={i} />
            ))}
          </div>
        ) : null}
      </div>
      <div className={s.collname}>{collection.name}</div>
      <div className={s.collname}>
        {/* {collection.value ? `VALUE:${collection.value} eth` : ""} */}
      </div>
    </div>
  );
};

const NftL = (props: { nft: nft; collectionName: string; open_nft }) => {
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
    // if(props.co)
    // console.log("collectionName", collectionName);
    if (props.collectionName != "") {
      props.open_nft(props.collectionName, props.nft.token_id);
    } else {
      console.log("collectionName is empty");
    }

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // return false;
  };

  return (
    <div onClick={onNftClick} className={s.nft_container}>
      {nft.image_url ? (
        <img className={s.imglarge} src={nft.image_url} />
      ) : (
        <div className={s.imglarge_loading} />
      )}
    </div>
  );
};

const NftXl = (props: { nft: nft; collectionName: string; open_nft }) => {
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
    props.open_nft(props.collectionName, props.nft.token_id);

    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    // return false;
  };

  return (
    <div onClick={onNftClick} className={s.collection_container2}>
      {nft.image_url ? (
        <img className={s.imglarge} src={nft.image_url} />
      ) : (
        <div className={s.imglarge_loading} />
      )}
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
