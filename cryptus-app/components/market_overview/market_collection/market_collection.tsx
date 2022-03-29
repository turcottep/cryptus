import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import { market_collection_props } from "../../../pages/market/[address]";
import { intervals } from "../net_worth/time_interval/time_interval";
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

  const [price, setPrice] = useState(market_collection_props.data_price);
  const [volume, setVolume] = useState(market_collection_props.volume);
  const [delta, setDelta] = useState(market_collection_props.floor_price_delta);

  const callbackFunction = async (childData) => {
    let viewingmode = intervals[childData];
    if (viewingmode == "three_months") {
      viewingmode = "3month";
    }
    const address = market_collection_props.address;
    console.log("new viewingmode : ", viewingmode);
    const res = await fetch("/api/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        viewingmode,
      }),
    });
    const { price, count, volume, delta } = await res.json();
    setPrice(price);
    setVolume(volume);
    setDelta(delta);
    console.log("new price !", price);
  };

  return (
    <div className={s.app}>
      <DesktopHeader tab="market" />
      <MarketCollectionHeader />
      <div className={s.container}>
        <MarketCollectionInfos
          collection_logo={market_collection_props.collection_logo}
          collection_name={market_collection_props.collection_name}
          collection_ticker={market_collection_props.collection_ticker}
        />
        <CollectionFloorPrice
          floor_price_live={market_collection_props.floor_price_live}
          floor_price_delta={delta}
          floor_price_timestamp={market_collection_props.floor_price_timestamp}
        />
        <CollectionMarketGraph
          callback={callbackFunction}
          data_price={price}
          data_volume={volume}
          address={market_collection_props.address}
        />
      </div>
    </div>
  );
}
