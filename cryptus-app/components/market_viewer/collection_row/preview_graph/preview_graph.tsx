import React, { useEffect, useState } from "react";
import s from "./preview_graph.module.scss";

import { collection } from "../../market_viewer";
import Graph from "../../../graph/graph";

// Need to add prop for collection
export default function PreviewGraph(props: {
  data_price: any;
  data_volume: any;
}) {
  return (
    <div id="preview_graph" className={s.graph}>
      <Graph
        data_price={props.data_price}
        data_volume={props.data_volume}
        detailled={false}
      />
    </div>
  );
}
