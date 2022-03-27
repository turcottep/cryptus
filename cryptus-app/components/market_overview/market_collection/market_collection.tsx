import React, { useState, useEffect } from "react";
import s from "./market_collection.module.scss";

import MarketCollectionHeader from "./market_collection_header/market_collection_header";
import MarketCollectionInfos from "./market_collection_infos/market_collection_infos";
import CollectionFloorPrice from "./collection_floor_price/collection_floor_price";
import CollectionMarketGraph from "./collection_market_graph/collection_market_graph";
import DesktopHeader from "../../header/desktop_header/desktop_header";

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
  callback_close;
  market_collection_props: market_collection_props;
}) {
  const { market_collection_props, isMobile } = props;
  console.log("MarketCollection props:", props);
  return (
    <div
      id="bg"
      className={s.backdrop}
      onClick={(e: any) => {
        //close if id == "bg"
        if (e.target.id === "bg") {
          props.callback_close();
        }
      }}
    >
      <div className={s.container}>
        {/* <DesktopHeader tab="market" /> */}
        {/* <MarketCollectionHeader /> */}
        <XButton callback={props.callback_close} />
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
    </div>
  );
}

const XButton = (props: { callback }) => {
  return (
    <div
      className={s.x_button}
      onClick={() => {
        props.callback();
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={3}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </div>
  );
};
