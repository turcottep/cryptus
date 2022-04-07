import React, { useEffect, useState } from "react";
import s from "./price_info.module.scss";

import { collection } from "../../../../../lib/data_types";
import FloorPrice from "./floor_price/floor_price";
import FloorPriceDelta from "./floor_price_delta/floor_price_delta";

// Need to add prop for collection
export default function PriceInfo(props: {
  collection: collection;
  currency: string;
  prices: number[];
}) {
  const { collection } = props;
  return (
    <div id="price_info" className={s.container}>
      <FloorPrice price={collection.floor_price} currency={props.currency} />
      <FloorPriceDelta
        initial_price={props.prices[0]}
        current_price={props.prices[props.prices.length - 1]}
        currency={props.currency}
      />
    </div>
  );
}
