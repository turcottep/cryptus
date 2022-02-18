import React, { useEffect, useState } from "react";
import s from "./market_viewer.module.scss";

import FavoriteCollections from "./favorite_collections/favorite_collections";
import MarketCollections from "./market_collections/market_collections";

export type collection = {
  id: string;
  logo: string;
  ticker: string;
  name: string;
  floor_price: number;
  floor_price_delta: number;
  timestamp: string;
};

const BAYC: collection = {
  id: "1",
  logo: "./images/BAYC.png",
  ticker: "BAYC",
  name: "Bored Ape Yacht Club",
  floor_price: 164285 / 3130.43,
  floor_price_delta: 6900 / 3130.43,
  timestamp: "Friday"
};

const PUNK: collection = {
  id: "2",
  logo: "./images/PUNK.png",
  ticker: "PUNK",
  name: "CryptoPunks",
  floor_price: 164285 / 3130.43,
  floor_price_delta: -6900 / 3130.43,
  timestamp: "Friday"
};

const BAYC2: collection = {
  id: "3",
  logo: "./images/BAYC.png",
  ticker: "BAYC",
  name: "Bored Ape Yacht Club",
  floor_price: 164285 / 3130.43,
  floor_price_delta: 6900 / 3130.43,
  timestamp: "Friday"
};

const PUNK2: collection = {
  id: "4",
  logo: "./images/PUNK.png",
  ticker: "PUNK",
  name: "CryptoPunks",
  floor_price: 164285 / 3130.43,
  floor_price_delta: -6900 / 3130.43,
  timestamp: "Friday"
};

export default function MarketViewer() {
  const user_collections: collection[] = [BAYC, PUNK, BAYC2, PUNK2];
  return (
    <div id="market_viewer" className={s.container}>
      <div className={s.favorites}>
        <FavoriteCollections collections={user_collections} />
      </div>
      <div className={s.market}>
        <MarketCollections collections={user_collections} />
      </div>
    </div>
  );
}
