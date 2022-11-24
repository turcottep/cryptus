import React, { useState, useEffect } from "react";
import s from "./collection_floor_price.module.scss";

export default function CollectionFloorPrice(props: {
  initial_price: number;
  current_price: number;
  floor_price_timestamp: string;
}) {
  const delta = props.current_price - props.initial_price;
  const delta_percent = ((delta / props.initial_price) * 100).toFixed(1);
  return (
    <div className={s.container}>
      <div className={s.priceLive}>
        {props.current_price.toFixed(2)} Ξ<div className={s.currency}> ETH</div>
      </div>
      <div className={s.delta}>
        <span className={delta > 0 ? s.green : s.red}>{delta.toFixed(2)}</span>Ξ
        (<span className={delta > 0 ? s.green : s.red}>{delta_percent}</span>
        %)
      </div>
    </div>
  );
}
