import React, { useState, useEffect } from "react";
import s from "./floor_price_timestamp.module.scss";

export default function FloorPriceTimestamp(props: {floor_price_timestamp: string}) {
  return (
    <div className={s.container}>
        {props.floor_price_timestamp}
    </div>
  );
}