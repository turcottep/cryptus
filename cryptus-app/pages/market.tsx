import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

import MarketViewer from "../components/market_viewer/market_viewer"

export default function Market() {
  return (
    <div className={s.container}>
        <div className={s.overview}></div>
        <div className={s.viewer}>
            <MarketViewer/>
        </div>
    </div>
  );
}