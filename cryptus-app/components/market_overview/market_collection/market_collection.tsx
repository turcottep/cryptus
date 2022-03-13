import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import { market_collection_props } from "../../../pages/market/[address]";

export default function MarketCollection(props: market_collection_props) {
  //console.log("MarketCollection props:", props);
  return (
    <div className={s.app}>
      <MarketCollectionHeader />
      <div className={s.container}>
        <MarketCollectionInfos
          collection_logo={props.collection_logo}
          collection_name={props.collection_name}
          collection_ticker={props.collection_ticker}
        />
        <CollectionFloorPrice
          floor_price_live={props.floor_price_live}
          floor_price_delta={props.floor_price_delta}
          floor_price_timestamp={props.floor_price_timestamp}
        />
        <CollectionMarketGraph
          data_price={props.data_price}
          data_volume={props.volume}
          address={props.address}
        />
      </div>
    </div>
  );
}
