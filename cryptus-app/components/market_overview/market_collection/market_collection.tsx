import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import DesktopHeader from "../../header/desktop_header/desktop_header";
import Card from "../../utils/card/card";
import { intervals } from "../net_worth/time_interval/time_interval";

export type market_collection_props = {
  collection_name: string;
  collection_logo: string;
  collection_ticker: string;
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
  data_price: number[];
  count: number[];
  volume: number[];
  address: string;
};

export default function MarketCollection(props: {
  isMobile: boolean;
  market_collection_props: market_collection_props;
  callback_close;
}) {
  const { market_collection_props, isMobile } = props;

  const [price, setPrice] = useState(market_collection_props.data_price);
  const [volume, setVolume] = useState(market_collection_props.volume);
  const [delta, setDelta] = useState(market_collection_props.floor_price_delta);

  const updatePrice = async (childData) => {
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
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <MarketCollectionInfos
        collection_logo={market_collection_props.collection_logo}
        collection_name={market_collection_props.collection_name}
        collection_ticker={market_collection_props.collection_ticker}
      />
      <CollectionFloorPrice
        floor_price_live={price[price.length - 1]}
        floor_price_delta={delta}
        floor_price_timestamp={market_collection_props.floor_price_timestamp}
      />
      <CollectionMarketGraph
        data_price={price}
        data_volume={volume}
        address={market_collection_props.address}
        callback={updatePrice}
      />
    </Card>
  );
}
