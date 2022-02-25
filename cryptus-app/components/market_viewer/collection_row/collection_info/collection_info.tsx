import React, { useEffect, useState } from "react";
import s from "./collection_info.module.scss";

import { collection } from "../../market_viewer";

// Need to add prop for collection
export default function CollectionInfo(props: { collection: collection }) {
  const collection = props.collection;
  return (
    <div id="collection_info" className={s.container}>
      <div className={s.first_row}>
        <CollectionLogo logo={collection.logo} />
        <CollectionTicker ticker={collection.ticker} />
      </div>
      <CollectionName name={collection.name} />
    </div>
  );
}

const CollectionLogo = (props: { logo: string }) => (
  <img className={s.logo} src={props.logo} />
);

const CollectionTicker = (props: { ticker: string }) => (
  <div className={s.ticker}>{props.ticker}</div>
);

const CollectionName = (props: { name: string }) => (
  <div className={s.name}>{props.name}</div>
);
