import React, { useEffect, useState } from "react";
import s from "./price_info.module.scss";

import {collection} from "../../market_viewer"
import FloorPrice from "./floor_price/floor_price"
import FloorPriceDelta from "./floor_price_delta/floor_price_delta"

// Need to add prop for collection
export default function PriceInfo(props: { collection: collection, currency: string }) {
  const {collection} = props;
  return (
    <div id="price_info" className={s.container}>
        <FloorPrice price={collection.floor_price} currency={props.currency} />
        <FloorPriceDelta price={collection.floor_price} delta={collection.floor_price_delta} currency={props.currency} />
    </div>
  );
}

