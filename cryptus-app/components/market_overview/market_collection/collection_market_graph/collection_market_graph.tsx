import React, { useState, useEffect } from "react";
import s from "./collection_market_graph.module.scss";

import CollectionGraph from "./collection_graph/collection_graph";
//import TimeInterval from "../../net_worth/time_interval/time_interval"

export default function CollectionMarketGraph(props) {
  return (
    <div className={s.container}>
      <CollectionGraph />
      {/* <TimeInterval/> */}
      <div className={s.timeinterval}>TIME INTERVAL</div>
    </div>
  );
}
