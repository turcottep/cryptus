import React, { useState, useEffect } from "react";
import s from "./floor_price_delta.module.scss";

export default function FloorPriceDelta(props: {floor_price_live:number, floor_price_delta: number}) {
  const delta_percent = parseFloat((props.floor_price_delta/props.floor_price_live*100).toString()).toFixed(2)
  return (
    <div className={s.container}>
        {props.floor_price_delta} Ξ ({delta_percent} %) total
    </div>
  );
}