import React, { useEffect, useState } from "react";
import s from "./collection_row.module.scss";

import CollectionInfo from "./collection_info/collection_info";
import PreviewGraph from "./preview_graph/preview_graph";
import PriceInfo from "./price_info/price_info";
import { collection } from "../../../../lib/data_types";

import GetNameWithoutSpaces from "../../../../lib/get_name_without_spaces";
import Loading from "../../../utils/loading/loading";
import { CircularProgress } from "@mui/material";
import Graph from "../../graph/graph";

export default function CollectionRow(props: { collection: collection }) {
  const is_loading =
    !props.collection.data_price ||
    (props.collection.data_price.length === 2 &&
      props.collection.data_price[0] === 0 &&
      props.collection.data_price[1] === 0);

  // const collection_name = GetNameWithoutSpaces(props.collection.name);
  // console.log("CollectionRow", props.collection, is_loading);
  // console.log("CollectionRow", props.collection);

  const { collection } = props;

  return (
    // <a className={s.anchor} href={`/market/${props.collection.address}`}>
    <div id="collection_row" className={s.container}>
      <div id="collection_row" className={s.box}>
        <div id="collection_info" className={s.info}>
          <img className={s.logo} src={collection.logo} alt={collection.name} />
          <div className={s.ticker}>{collection.ticker}</div>
          <div className={s.name}>{collection.name}</div>
        </div>
        <div id="preview_graph" className={s.graph}>
          <Graph
            data_price={props.collection.data_price}
            data_volume={props.collection.data_volume}
            color={props.collection.floor_price_delta > 0 ? "green" : "red"}
            detailled={false}
          />
        </div>
        <PriceInfo
          collection={props.collection}
          currency="eth"
          prices={props.collection.data_price}
        />
        {is_loading && (
          <div className={s.loading_container}>
            <CircularProgress color="primary" />
          </div>
        )}
      </div>
    </div>
  );
}
