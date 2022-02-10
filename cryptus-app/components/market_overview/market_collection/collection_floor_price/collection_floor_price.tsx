import { floor } from "cypress/types/lodash";
import React, { useState, useEffect } from "react";
import s from "./collection_floor_price.module.scss";

import FloorPriceDelta from "./floor_price_delta/floor_price_delta"
import FloorPriceTimestamp from "./floor_price_timestamp/floor_price_timestamp"

export default function MarketCollectionHeader(props: {floor_price_live: number, floor_price_delta: number, floor_price_timestamp: string}) {
  return (
    <div className={s.container}>
      <div className={s.priceLive}>
          {props.floor_price_live} Ξ
          <div className={s.currency}> ETH</div>
      </div>
      <FloorPriceDelta floor_price_live={props.floor_price_live} floor_price_delta={props.floor_price_delta }/>
      <FloorPriceTimestamp floor_price_timestamp={props.floor_price_timestamp}/>
    </div>
  );
}