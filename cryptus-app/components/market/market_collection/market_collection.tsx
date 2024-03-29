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
  const [stats, setStats] = useState([]);

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
    const stats_list = Object.entries(data.stats).map(([key, value]) => {
      // remove _ and capitalize all first letter
      const key_clean = key.replace(/_/g, " ");
      const key_clean_capitalize = key_clean
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // format number
      const value_clean = (value as any).toFixed(2);
      return { key: key_clean_capitalize, value: value_clean };
    });
    console.log("stats_list", stats_list);
    const stats_list_reverse = stats_list.reverse();

    setStats(stats_list_reverse);
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
      <div className={s.container}>
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
        <div className={s.stats}>
          {stats.map((d) => (
            <div
              key={d.name}
              className={s.stat}
              onClick={(e) => e.stopPropagation()}
            >
              <div className={s.value}>
                {Math.abs(d.value) >= 1
                  ? parseFloat(d.value).toFixed(0)
                  : parseFloat(d.value).toFixed(2)}
              </div>
              <div className={s.rarity}>{d.key}</div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
