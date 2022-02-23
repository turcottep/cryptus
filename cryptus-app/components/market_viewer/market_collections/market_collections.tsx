import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../market_viewer";

// Need to add prop for collections
export default function MarketCollections(props: {
  collections: collection[];
}) {
  return (
    <div id="market_collections" className={s.container}>
      <MarketCollectionsHeader />
      <div className={s.market}>
        {props.collections ? (
          props.collections.map((c) => (
            <div key={c.id} className={s.collection}>
              <CollectionRow collection={c} />
            </div>
          ))
        ) : (
          <div>No collections</div>
        )}
      </div>
    </div>
  );
}

const MarketCollectionsHeader = () => (
  <div className={s.header}>
    <div className={s.icon}>
      <img src="icons/market_icon.png" />
    </div>
    <div className={s.label}>Market</div>
  </div>
);
