import React, { useEffect, useState } from "react";
import s from "./collection_row.module.scss";

import CollectionInfo from "./collection_info/collection_info";
import PreviewGraph from "./preview_graph/preview_graph";
import PriceInfo from "./price_info/price_info";
import { collection } from "../market_viewer";

// Need to add prop for collection
export default function CollectionRow(props: { collection: collection }) {
  return (
    <a className={s.anchor} href={`/market/${props.collection.address}`}>
      <div id="collection_row" className={s.container}>
        <CollectionInfo collection={props.collection} />
        <PreviewGraph
          data_price={props.collection.data_price}
          data_volume={props.collection.data_volume}
        />
        <PriceInfo collection={props.collection} currency="eth" />
      </div>
    </a>
  );
}
