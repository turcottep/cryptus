import React, { useEffect, useState } from "react";
import s from "./price_info.module.scss";

import {collection} from "../../market_viewer"

// Need to add prop for collection
export default function PriceInfo(props: { collection: collection, currency: string }) {
  const collection = props.collection
  return (
    <div id="price_info" className={s.container}>
      <div className={s.fp}>
        <FloorPrice price={collection.floor_price} currency={props.currency} />
      </div>
      <div className={s.fpd}>
        <FloorPriceDelta price={collection.floor_price} delta={collection.floor_price_delta} currency={props.currency} />
      </div>
    </div>
  );
}

// Need to add more display options (different currencies, # of digits after comma, etc.)
function FloorPrice(props: {price: number, currency: string}) {
    const price = props.price
    const curr = props.currency
    if (curr=="eth") {
        return(
            <div className={s.price}>{price.toFixed(1) + "Ξ"}</div>
        )
    } else if (curr=="usd") {
        const conversion = 3130.43
        const new_price = (price*conversion)/1000
        return(
            <div className={s.price}>{new_price.toFixed(1) + "k$"}</div>
        )
    }      
}

// Idem
function FloorPriceDelta(props: { price: number, delta: number, currency: string }) {
  const price = props.price
  const delta = props.delta
  const curr = props.currency
  if (curr=="eth") {
    if (delta > 0.0) {
        const adj_delta = delta.toFixed(1)
        const percent = ((100*delta)/price).toFixed(2)
        return <div className={s.green_delta}>{"+" + adj_delta + "Ξ (" + percent + "%)"}</div>;
    } else {
        const adj_delta = delta.toFixed(1)
        const percent = ((-100*delta)/price).toFixed(2)
        return <div className={s.red_delta}>{adj_delta + "Ξ (" + percent + "%)"}</div>;
    }
} else if (curr=="usd") {
    const conversion = 3130.43
    if (delta > 0.0) {
        const adj_delta = ((delta*conversion)/1000).toFixed(1)
        const percent = ((100*delta)/price).toFixed(2)
        return <div className={s.green_delta}>{"+" + adj_delta + "k$ (" + percent + "%)"}</div>;
    } else {
        const adj_delta = ((delta*conversion)/1000).toFixed(1)
        const percent = ((-100*delta)/price).toFixed(2)
        return <div className={s.red_delta}>{adj_delta + "k$ (" + percent + "%)"}</div>;
    }
}
}
