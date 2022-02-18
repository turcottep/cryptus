import React, { useEffect, useState } from "react";
import s from "./preview_graph.module.scss";

import {collection} from "../../market_viewer"

// Need to add prop for collection
export default function PreviewGraph(props: {collection: collection}) {
  const collection = props.collection
  if (collection.floor_price_delta > 0) {
    return (
        <div id="preview_graph" className={s.graph}>
            <img src="./images/green.png" />
        </div>
      );
  } else {
    return (
        <div id="preview_graph" className={s.graph}>
            <img src="./images/red.png" />
        </div>
      );
  }
  
}

