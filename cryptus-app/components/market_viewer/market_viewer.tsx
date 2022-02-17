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
};

export default function MarketViewer(props: { collections: collection[] }) {
  return (
    <div id="market_viewer" className={s.container}>
      <div className={s.favorites}>
        <FavoriteCollections collections={props.collections} />
      </div>
      <div className={s.market}>
        <MarketCollections collections={props.collections} />
      </div>
    </div>
  );
}
