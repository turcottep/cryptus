import React, { useState, useEffect } from "react";
import Graph from "../../../graph/graph";
import s from "./collection_market_graph.module.scss";

import TimeInterval from "../../net_worth/time_interval/time_interval";

export default function CollectionMarketGraph(props: {
  data_price: number[];
  data_volume: number[];
}) {
  return (
    <div className={s.container}>
      <div className={s.graph}>
        <Graph
          data_price={props.data_price}
          data_volume={props.data_volume}
          detailled={true}
        />
      </div>
      <TimeInterval active={0} />
    </div>
  );
}
