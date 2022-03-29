import React, { useEffect, useState } from "react";
import s from "./market_viewer.module.scss";

import FavoriteCollections from "./favorite_collections/favorite_collections";
import MarketCollections from "./market_collections/market_collections";

export type collection = {
  id: string;
  logo: string;
  ticker: string;
  name: string;
  address: string;
  floor_price: number;
  floor_price_delta: number;
  data_price: number[];
  data_volume: number[];
  timestamp: string;
};

export default function MarketViewer(props: {
  collections_market: collection[];
  collections_favorite: collection[];
}) {
  return (
    <div id="market_viewer" className={s.container}>
      <div className={s.market}>
        <MarketCollections
          name={"My Collections"}
          icon={"/icons/favorite_icon.png"}
          collections={props.collections_favorite}
        />
      </div>
      <div className={s.market}>
        <MarketCollections
          name={"Market"}
          icon={"/icons/market_icon.png"}
          collections={props.collections_market}
        />
      </div>
    </div>
  );
}
