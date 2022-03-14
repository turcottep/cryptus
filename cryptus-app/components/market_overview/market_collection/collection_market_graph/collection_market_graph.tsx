import React, { useState, useEffect } from "react";
import Graph from "../../../graph/graph";
import s from "./collection_market_graph.module.scss";

import TimeInterval, {
  intervals,
} from "../../net_worth/time_interval/time_interval";
import { addSyntheticLeadingComment } from "typescript";
import ForgotPassword from "../../../forgot_password/forgot_password";

export default function CollectionMarketGraph(props: {
  data_price: number[];
  data_volume: number[];
  address: string;
  callback: Function;
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
      <TimeInterval active={0} callback={props.callback} />
    </div>
  );
}
