import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../market_viewer";

// Need to add prop for collections
export default function MarketCollections(props: {
  name: string;
  icon: string;
  collections: collection[];
  callback;
}) {
  return (
    <div id="market_collections" className={s.container}>
      <MarketCollectionsHeader name={props.name} icon={props.icon} />
      <div className={s.market}>
        {props.collections ? (
          props.collections.map((c, i) => (
            <div
              key={i}
              className={s.collection}
              onClick={() => {
                props.callback(c.name);
              }}
            >
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

const MarketCollectionsHeader = (props: { name: string; icon: string }) => (
  <div className={s.header}>
    <img className={s.icon} src={props.icon} />

    <div className={s.label}>{props.name}</div>
  </div>
);
