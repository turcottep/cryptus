import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import { market_collection_props } from "../../../pages/market/[address]";
import DesktopHeader from "../../header/desktop_header/desktop_header";

export default function MarketCollection(props: {
  isMobile: boolean;
  market_collection_props: market_collection_props;
}) {
  const { market_collection_props, isMobile } = props;
  console.log("MarketCollection props:", props);
  return (
    <div className={s.app}>
      <DesktopHeader tab="market" />
      <MarketCollectionHeader />

      <MarketCollectionInfos
        collection_logo={market_collection_props.collection_logo}
        collection_name={market_collection_props.collection_name}
        collection_ticker={market_collection_props.collection_ticker}
      />
      <CollectionFloorPrice
        floor_price_live={market_collection_props.floor_price_live}
        floor_price_delta={market_collection_props.floor_price_delta}
        floor_price_timestamp={market_collection_props.floor_price_timestamp}
      />
      <CollectionMarketGraph
        data_price={market_collection_props.data_price}
        data_volume={market_collection_props.volume}
        address={market_collection_props.address}
      />
    </div>
  );
}
