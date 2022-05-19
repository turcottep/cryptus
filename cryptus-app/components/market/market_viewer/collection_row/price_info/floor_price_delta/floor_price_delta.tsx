import React, { useEffect, useState } from "react";
import s from "./floor_price_delta.module.scss";

export default function FloorPriceDelta(props: {
  initial_price: number;
  current_price: number;
  // delta: number;
  currency: string;
}) {
  // const delta = props.delta ?? 0.0;
  // const price = props.price ?? 0.0;
  const delta = props.current_price - props.initial_price;
  const currency = props.currency ?? "eth";
  if (currency == "eth") {
    if (delta > 0.0) {
      const adj_delta = delta.toFixed(1);
      const percent = ((100 * delta) / props.initial_price).toFixed(2);
      return (
        <div className={s.green_delta}>
          {"+" + adj_delta + "Ξ (" + percent + "%)"}
        </div>
      );
    } else {
      const adj_delta = delta.toFixed(1);
      const percent = ((-100 * delta) / props.initial_price).toFixed(2);
      return (
        <div className={s.red_delta}>{adj_delta + "Ξ (" + percent + "%)"}</div>
      );
    }
  } else if (currency == "usd") {
    const conversion = 3130.43;
    if (delta > 0.0) {
      const adj_delta = ((delta * conversion) / 1000).toFixed(1);
      const percent = ((100 * delta) / props.initial_price).toFixed(2);
      return (
        <div className={s.green_delta}>
          {"+" + adj_delta + "k$ (" + percent + "%)"}
        </div>
      );
    } else {
      const adj_delta = ((delta * conversion) / 1000).toFixed(1);
      const percent = ((-100 * delta) / props.initial_price).toFixed(2);
      return (
        <div className={s.red_delta}>{adj_delta + "k$ (" + percent + "%)"}</div>
      );
    }
  }
}
