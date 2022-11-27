import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import DesktopHeader from "../../basic/header/desktop_header/desktop_header";
import Card from "../../utils/card/card";
import { intervals } from "../../../lib/data_types";

export type market_collection_props = {
  collection_name: string;
  collection_logo: string;
  collection_ticker: string;
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
  data_price: number[];
  interval: intervals;
  count: number[];
  volume: number[];
  address: string;
  slug: string;
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
  const [stats, setStats] = useState({});

  useEffect(() => {
    updatePrice(props.market_collection_props.interval);
    getStats();
  }, []);

  const getStats = async () => {
    const opensea_api_key = process.env.NEXT_PUBLIC_OPENSEA_API_KEY;
    const slug = market_collection_props.slug;
    console.log("slug", slug);

    const response = await fetch(
      `https://api.opensea.io/api/v1/collection/${slug}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-API-KEY": opensea_api_key,
        },
      }
    );
    const data = await response.json();
    console.log("data", data);

    setStats(data);
  };

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
    setDelta(delta);
    setPrice(price);
    setVolume(count);
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
        initial_price={price[0]}
        current_price={price[price.length - 1]}
        floor_price_timestamp={market_collection_props.floor_price_timestamp}
      />
      <CollectionMarketGraph
        data_price={price}
        data_volume={volume}
        price_delta={delta}
        interval={market_collection_props.interval}
        address={market_collection_props.address}
        callback={updatePrice}
      />
    </Card>
  );
}
