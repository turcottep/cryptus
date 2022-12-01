import React, { useEffect, useState } from "react";
import s from "./price_info.module.scss";

import { collection } from "../../../../../lib/data_types";

// Need to add prop for collection
export default function PriceInfo(props: {
  collection: collection;
  currency: string;
  prices: number[];
}) {
  const { collection, prices, currency } = props;
  return (
    <div id="price_info" className={s.number}>
      <FloorPrice price={collection.floor_price} currency={props.currency} />
      <FloorPriceDelta
        initial_price={prices ? prices[0] : 0}
        current_price={prices ? prices[props.prices.length - 1] : 0}
        currency={currency}
      />
    </div>
  );
}

function FloorPrice(props: { price: number; currency: string }) {
  // const {price, currency} = props;
  const currency = props.currency ?? "eth";
  const price = props.price ?? 0.0;
  if (currency == "eth") {
    return <div className={s.num}>{price.toFixed(1) + " Ξ"}</div>;
  } else if (currency == "usd") {
    const conversion = 3130.43;
    const new_price = (price * conversion) / 1000;
    return <div className={s.num}>{new_price.toFixed(1) + "k$"}</div>;
  }
}

function FloorPriceDelta(props: {
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
      const percent = ((100 * delta) / props.initial_price).toFixed(1);
      return (
        <div className={s.green_delta}>
          {"+ " + adj_delta + "꠵ (" + percent + "%)"}
        </div>
      );
    } else {
      const adj_delta = delta.toFixed(1);
      const percent = ((-100 * delta) / props.initial_price).toFixed(1);
      return (
        <div className={s.red_delta}>{adj_delta + "꠵ (" + percent + "%)"}</div>
      );
    }
  } else if (currency == "usd") {
    const conversion = 3130.43;
    if (delta > 0.0) {
      const adj_delta = ((delta * conversion) / 1000).toFixed(1);
      const percent = ((100 * delta) / props.initial_price).toFixed(2);
      return (
        <div className={s.green_delta}>
          {"+ " + adj_delta + "k$ (" + percent + "%)"}
        </div>
      );
    } else {
      const adj_delta = ((delta * conversion) / 1000).toFixed(1);
      const percent = ((-100 * delta) / props.initial_price).toFixed(1);
      return (
        <div className={s.red_delta}>{adj_delta + "k$ (" + percent + "%)"}</div>
      );
    }
  }
}
