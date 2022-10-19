import React, { useState, useEffect } from "react";
import s from "./profile_wallet_viewer.module.scss";

import { useRouter } from "next/router";

import { nft, nft_collection } from "../../../../lib/data_types";
import InfiniteScroll from "react-infinite-scroll-component";
import { walletsType } from "../../../basic/wallet_manager/wallet_manager";
import get_collections_in_wallet from "../../../../lib/get_collections_in_wallet";
import get_nfts_for_wallet from "../../../../lib/get_nfts_for_wallet";
import sortNftsIntoCollections from "../../../../lib/sort_nfts_into_collections";
import useWindowSize from "../../../utils/use_window_size";

import get_empty_profile_props from "../../../../lib/empty_profile_props";

export default function ProfileWalletViewer(props: {
  collections: nft_collection[];
  open_collection: (collection_name: string) => void;
  open_nft: (collection_name: string, nft_token_id: string) => void;
  collections_filter: string[];
  wallets: walletsType[];
}) {
  let size = useWindowSize();
  let nbColWidth = Math.ceil(size.width / 170);
  let nbColHeight = Math.ceil((size.height - 300) / 190);
  let nbColToFillPage = nbColWidth * nbColHeight;

  const [collections, setCollections] = useState(props.collections);
  const [hasMore, setHasMore] = useState(true);
  const [walletIndex, setWalletIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(nbColToFillPage);

  const getMoreCollections = async () => {
    console.log("GetMoreCollections");
    console.log(collections);
    var hMore = true;
    let collections_in_wallet = await get_collections_in_wallet(
      props.wallets[walletIndex].address
    );
    let collections_in_wallet_sliced = null;
    if (collections_in_wallet.length > currentIndex + nbColWidth) {
      collections_in_wallet_sliced = collections_in_wallet.slice(
        currentIndex,
        currentIndex + 6
      );
      setCurrentIndex(currentIndex + nbColWidth);
    } else if (collections_in_wallet.length > currentIndex) {
      collections_in_wallet_sliced = collections_in_wallet.slice(
        currentIndex,
        collections_in_wallet.length
      );
      setCurrentIndex(currentIndex + collections_in_wallet_sliced.length);
    } else if (walletIndex + 1 < props.wallets.length) {
      setWalletIndex(walletIndex + 1);
      hMore = false;
    } else {
      setHasMore(false);
      hMore = false;
    }
    if (hMore) {
      let nfts_per_wallet = await get_nfts_for_wallet(
        props.wallets[walletIndex].address,
        collections_in_wallet_sliced
      );
      console.log("NFTS : ", nfts_per_wallet);
      let newCollections = sortNftsIntoCollections(nfts_per_wallet);
      setCollections((collection) => [...collection, ...newCollections]);
    }
  };
  const props_empty = get_empty_profile_props();
  return (
    <div className={s.container}>
      <InfiniteScroll
        className={s.containerRISC}
        style={{ overflowY: "hidden" }}
        dataLength={collections.length}
        next={getMoreCollections}
        hasMore={hasMore}
        loader={
          <Collection
            collection={props_empty.collections[0]}
            open_collection={props.open_collection}
            open_nft={props.open_nft}
          />
        }
        endMessage={<h4>Nothing more to show</h4>}
      >
        {collections
          .filter((collection) => {
            return !props.collections_filter.includes(collection.address);
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
      </InfiniteScroll>
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
    props.open_collection(props.collection.name);
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
    props.open_nft(props.collectionName, props.nft.token_id);

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
