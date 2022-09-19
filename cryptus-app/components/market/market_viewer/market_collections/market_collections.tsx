import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";
import collectionDictionary from "../../../../lib/collectionDictionary";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../../../../lib/data_types";
import InfiniteScroll from "react-infinite-scroll-component";

// Need to add prop for collections
export default function MarketCollections(props: {
  name: string;
  icon: string;
  collections: collection[];
  callback;
  connected?: boolean;
}) {
  const [collections, setCollections] = useState(
    props.collections.slice(0, 10)
  );
  console.log("First collections ", collections);
  const [hasMore, setHasMore] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(10);

  const getMoreCollections = () => {
    const collections_dict = collectionDictionary;
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
    } else {
      newCollectionsSliced = newCollections.slice(
        currentIndex,
        newCollections.length
      );
      setCurrentIndex(currentIndex + newCollections.length);
      setHasMore(false);
    }
    console.log(newCollectionsSliced);
    setCollections((collection) => [...collection, ...newCollectionsSliced]);
  };

  return (
    <div id="market_collections" className={s.container}>
      <Header name={props.name} icon={props.icon} />
      {collections && collections[0] ? (
        <InfiniteScroll
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
