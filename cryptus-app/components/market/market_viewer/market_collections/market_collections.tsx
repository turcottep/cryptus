import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";
import collectionDictionary from "../../../../lib/collectionDictionary";
import { intervals } from "../../../../lib/data_types";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../../../../lib/data_types";
import InfiniteScroll from "react-infinite-scroll-component";
import { updatePrice } from "../../market";

import { CircularProgress } from "@mui/material";
import {
  ArrowDownwardRounded,
  ArrowUpwardRounded,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";

// Need to add prop for collections
export default function MarketCollections(props: {
  setLoading: Function;
  interval: intervals;
  name: string;
  icon: string;
  collections: collection[];
  callback;
  connected?: boolean;
}) {
  const [collections, setCollections] = useState(props.collections);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(10);
  const [noCollection, setNoCollection] = useState(false);

  useEffect(() => {
    setCollections(props.collections);
  }, [props.collections]);

  // const getMoreCollections = async () => {
  //   console.log("GetMoreCollections");
  //   const collections_dict = collectionDictionary;
  //   var hMore = true;
  //   const newCollections = Object.keys(collections_dict).map((key) => {
  //     return collections_dict[key];
  //   }) as collection[];
  //   let newCollectionsSliced = null;
  //   if (newCollections.length > currentIndex + 10) {
  //     newCollectionsSliced = newCollections.slice(
  //       currentIndex,
  //       currentIndex + 10
  //     );
  //     setCurrentIndex(currentIndex + 10);
  //   } else if (newCollections.length > currentIndex) {
  //     newCollectionsSliced = newCollections.slice(
  //       currentIndex,
  //       newCollections.length
  //     );
  //     setCurrentIndex(currentIndex + newCollectionsSliced.length);
  //   } else {
  //     setHasMore(false);
  //     hMore = false;
  //   }
  //   if (hMore) {
  //     updatePrice(props.interval, newCollectionsSliced);
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setCollections((collection) => [...collection, ...newCollectionsSliced]);
  //   }
  // };

  useEffect(() => {
    // console.log("collection changed", collections);
    if (props.collections.length === 0) {
      setNoCollection(true);
    } else {
      setNoCollection(false);
    }
  }, [props.collections]);

  return !noCollection ? (
    <Collapsable title={props.name}>
      <div id="market_collections" className={s.container}>
        <div className={s.infiniteScrollDiv}>
          {collections.map((c, i) => (
            <div
              key={i}
              className={s.collection}
              onClick={(e) => {
                console.log("clicked me");

                props.callback(c.name);
                e.stopPropagation();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <CollectionRow collection={c} />
            </div>
          ))}
        </div>
      </div>
    </Collapsable>
  ) : (
    <Collapsable title={props.name} closed>
      <div id="market_collections" className={s.container}>
        <NoCollection connected={props.connected} />
      </div>
    </Collapsable>
  );
}

const Header = (props: { name: string; icon: string }) => (
  <div className={s.header}>
    <img className={s.icon} src={props.icon} />
    <div className={s.label}>{props.name}</div>
  </div>
);

const NoCollection = (props: { connected: boolean }) => (
  <div className={s.nocollection_container}>
    <div className={s.nocollection_div}>
      {props && props.connected
        ? "You don't have any collections to display"
        : "You are not connected to the blockchain"}
    </div>
  </div>
);

export const Collapsable = (props: {
  children: React.ReactNode;
  title: string;
  closed?: boolean;
}) => {
  const [c, setC] = useState(props.closed ? true : false);

  return (
    <div
      className={s.collapsable}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setC(!c);
      }}
    >
      <div>
        <div className={s.title}>{props.title}</div>
        <div className={s.arrow}>{c ? <ExpandMore /> : <ExpandLess />}</div>
      </div>
      {c ? null : props.children}
    </div>
  );
};
