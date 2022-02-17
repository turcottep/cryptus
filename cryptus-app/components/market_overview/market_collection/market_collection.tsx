import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header"
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos"
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price"
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph"
import { collection } from "../../market_viewer/market_viewer";


export default function MarketCollection(props: collection) {
  return (
    <div className={s.app}>
      <MarketCollectionHeader/>
      <div className={s.container}>
        <MarketCollectionInfos
            collection_logo={props.logo}
            collection_name={props.name}
            collection_ticker={props.ticker}
        />
        <CollectionFloorPrice
            floor_price_live={props.floor_price}
            floor_price_delta={props.floor_price_delta}
            floor_price_timestamp={props.timestamp}
        />
        <CollectionMarketGraph/>
      </div>
    </div>
  );
}
