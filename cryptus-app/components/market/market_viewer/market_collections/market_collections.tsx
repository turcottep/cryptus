import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";
import collectionDictionary from "../../../../lib/collectionDictionary";
import { intervals } from "../../../../lib/data_types";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../../../../lib/data_types";
import InfiniteScroll from "react-infinite-scroll-component";
import { updatePrice } from "../../market";

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

  useEffect(() => {
    setCollections(props.collections);
  }, [props.collections]);

  const getMoreCollections = () => {
    console.log("GetMoreCollections");
    const collections_dict = collectionDictionary;
    var hMore = true;
    const newCollections = Object.keys(collections_dict).map((key) => {
      return collections_dict[key];
    }) as collection[];
    let newCollectionsSliced = null;
    if (newCollections.length > currentIndex + 10) {
      newCollectionsSliced = newCollections.slice(
        currentIndex,
        currentIndex + 10
      );
      setCurrentIndex(currentIndex + 10);
    } else if (newCollections.length > currentIndex) {
      newCollectionsSliced = newCollections.slice(
        currentIndex,
        newCollections.length
      );
      setCurrentIndex(currentIndex + newCollections.length);
    } else {
      setHasMore(false);
      hMore = false;
    }
    if (hMore) {
      updatePrice(
        props.interval,
        false,
        props.setLoading,
        newCollectionsSliced
      );
      setCollections((collection) => [...collection, ...newCollectionsSliced]);
    }
  };

  return (
    <div id="market_collections" className={s.container}>
      <Header name={props.name} icon={props.icon} />
      {collections && collections[0] ? (
        <div className={s.infiniteScrollDiv}>
          <InfiniteScroll
            style={{ overflowY: "hidden" }}
            dataLength={collections.length}
            next={getMoreCollections}
            hasMore={hasMore}
            loader={<h3> Loading...</h3>}
            endMessage={<h4>Nothing more to show</h4>}
          >
            {collections.map((c, i) => (
              <div
                key={i}
                className={s.collection}
                onClick={() => {
                  props.callback(c.name);
                }}
              >
                <CollectionRow collection={c} />
              </div>
            ))}
          </InfiniteScroll>
        </div>
      ) : (
        <NoCollection connected={props.connected} />
      )}
    </div>
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
