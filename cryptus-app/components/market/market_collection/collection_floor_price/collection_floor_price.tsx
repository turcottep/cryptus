import React, { useState, useEffect } from "react";
import s from "./collection_floor_price.module.scss";

export default function CollectionFloorPrice(props: {
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
        <span className={props.floor_price_delta > 0 ? s.green : s.red}>
          {props.floor_price_delta.toFixed(2)}
        </span>
        Ξ (
        <span className={props.floor_price_delta > 0 ? s.green : s.red}>
          {delta_percent}
        </span>
        %)
      </div>
    </div>
  );
}
