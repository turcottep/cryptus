import React, { useState, useEffect } from "react";
import s from "./collection_floor_price.module.scss";

export default function CollectionFloorPrice(props: {
  initial_price: number;
  current_price: number;
  floor_price_timestamp: string;
}) {
  const current_price = props.current_price ? props.current_price : 0;
  const initial_price = props.initial_price ? props.initial_price : 0;
  const delta = current_price - initial_price;
  const delta_percent = ((delta / (initial_price + 0.000001)) * 100).toFixed(1);
  return (
    <div className={s.container}>
      <div className={s.priceLive}>
        {current_price.toFixed(2)} Ξ<div className={s.currency}> ETH</div>
      </div>
      <div className={s.delta}>
        <span className={delta > 0 ? s.green : s.red}>{delta.toFixed(2)}</span>Ξ
        (<span className={delta > 0 ? s.green : s.red}>{delta_percent}</span>
        %)
      </div>
    </div>
  );
}
