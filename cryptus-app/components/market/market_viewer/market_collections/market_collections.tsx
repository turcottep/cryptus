import React, { useEffect, useState } from "react";
import s from "./market_collections.module.scss";

import CollectionRow from "../collection_row/collection_row";
import { collection } from "../../../../lib/data_types";

// Need to add prop for collections
export default function MarketCollections(props: {
  name: string;
  icon: string;
  collections: collection[];
  callback;
  connected?: boolean;
}) {
  // console.log(props.collections);
  return (
    <div id="market_collections" className={s.container}>
      <Header name={props.name} icon={props.icon} />
      {props.collections && props.collections[0] ? (
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
