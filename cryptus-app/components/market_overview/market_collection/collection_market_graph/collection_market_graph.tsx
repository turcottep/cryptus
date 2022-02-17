import React, { useState, useEffect } from "react";
import s from "./collection_market_graph.module.scss";

//import TimeInterval from "../../net_worth/time_interval/time_interval"

export default function CollectionMarketGraph(props) {
  return (
    <div className={s.container}>
        <img className={s.graph} src="./images/placeholder_graph.jpg"></img>
        {/* <TimeInterval/> */}
        <div className={s.timeinterval}>
            TIME INTERVAL
        </div>
    </div>
  );
}