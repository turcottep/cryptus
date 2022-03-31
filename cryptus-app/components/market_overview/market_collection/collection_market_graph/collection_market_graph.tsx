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
  const [value, setValue] = useState(props);
  const address = value.address;
  const [price, setPrice] = useState(value.data_price);
  const [volume, setVolume] = useState(value.data_volume);

  useEffect(() => {
    setValue(props);
    setPrice(props.data_price);
    setVolume(props.data_volume);
  }, [props]);

  const callbackFunction = async (childData) => {
    let viewingmode = intervals[childData];
    if (viewingmode == "three_months") {
      viewingmode = "3month";
    }
    console.log("new viewingmode : ", viewingmode);
    const res = await fetch("/api/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        viewingmode,
      }),
    });
    const { price, count, volume } = await res.json();
    setPrice(price);
    setVolume(volume);
    console.log("new price !", price);
  };

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
