import React, { useEffect, useState } from "react";
import s from "./collection_row.module.scss";

import CollectionInfo from "./collection_info/collection_info";
import PreviewGraph from "./preview_graph/preview_graph";
import PriceInfo from "./price_info/price_info";
import {collection} from "../market_viewer"

// Need to add prop for collection
export default function CollectionRow(props: {collection: collection}) {
  return (
    <div id="collection_row" className={s.container}>
      <div className={s.infos}>
        <CollectionInfo collection={props.collection}/>
      </div>
      <div className={s.graph}>
        <PreviewGraph collection={props.collection}/>
      </div>
      <div className={s.price}>
        <PriceInfo collection={props.collection} currency="eth" />
      </div>
    </div>
  );
}
