import React, { useState, useEffect } from "react";
import s from "./collection_floor_price.module.scss";

export default function MarketCollectionHeader(props: {
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
}) {
  const delta_percent = parseFloat(
    ((props.floor_price_delta / props.floor_price_live) * 100).toString()
  ).toFixed(2);
  return (
    <div className={s.container}>
      <div className={s.priceLive}>
        {props.floor_price_live.toFixed(2)} Ξ
        <div className={s.currency}> ETH</div>
      </div>
      <div className={s.delta}>
        {props.floor_price_delta.toFixed(2)} Ξ ({delta_percent} %) total
      </div>
      {/* <div>
        {props.floor_price_timestamp}
      </div> */}
    </div>
  );
}
