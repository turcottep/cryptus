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
  const [value, setValue] = useState(market_collection_props);
  useEffect(() => {
    console.log("Changing Props");
    setValue(market_collection_props);
  }, [market_collection_props]);
  console.log("MarketCollection props:", props);
  return (
    <div className={s.app}>
      <DesktopHeader tab="market" />
      <MarketCollectionHeader />

      <MarketCollectionInfos
        collection_logo={value.collection_logo}
        collection_name={value.collection_name}
        collection_ticker={value.collection_ticker}
      />
      <CollectionFloorPrice
        floor_price_live={value.floor_price_live}
        floor_price_delta={value.floor_price_delta}
        floor_price_timestamp={value.floor_price_timestamp}
      />
      <CollectionMarketGraph
        data_price={value.data_price}
        data_volume={value.volume}
        address={value.address}
      />
    </div>
  );
}
