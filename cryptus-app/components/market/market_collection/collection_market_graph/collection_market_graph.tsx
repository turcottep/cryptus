import React, { useState, useEffect } from "react";
import Graph from "../../graph/graph";
import s from "./collection_market_graph.module.scss";

import TimeInterval from "../../market_header/time_interval/time_interval";
import { intervals } from "../../../../lib/data_types";

export default function CollectionMarketGraph(props: {
  data_price: number[];
  data_volume: number[];
  price_delta: number;
  interval: intervals;
  address: string;
  callback: Function;
}) {
  const [value, setValue] = useState(props);
  const address = value.address;
  const [price, setPrice] = useState(value.data_price);
  const [volume, setVolume] = useState(value.data_volume);

  useEffect(() => {
    setValue(props);
    setPrice(props.data_price);
    setVolume(props.data_volume);
  }, [props]);

  return (
    <div className={s.container}>
      <div className={s.graph}>
        <Graph
          data_price={props.data_price}
          data_volume={props.data_volume}
          color={props.price_delta > 0 ? "green" : "red"}
          detailled={true}
        />
      </div>
      <TimeInterval
        active={props.interval}
        callback={props.callback}
        loading={false}
      />
    </div>
  );
}
