import React, { useEffect, useState } from "react";
import s from "./collection_row.module.scss";

import CollectionInfo from "./collection_info/collection_info";
import PreviewGraph from "./preview_graph/preview_graph";
import PriceInfo from "./price_info/price_info";
import { collection } from "../../../../lib/data_types";

import GetNameWithoutSpaces from "../../../../lib/get_name_without_spaces";
import Loading from "../../../utils/loading/loading";
import { CircularProgress } from "@mui/material";

// Need to add prop for collection
export default function CollectionRow(props: { collection: collection }) {
  // const collection_name = GetNameWithoutSpaces(props.collection.name);
  const is_loading =
    !props.collection.data_price ||
    (props.collection.data_price.length === 2 &&
      props.collection.data_price[0] === 0 &&
      props.collection.data_price[1] === 0);
  // console.log("CollectionRow", props.collection, is_loading);

  // console.log("CollectionRow", props.collection);

  return (
    // <a className={s.anchor} href={`/market/${props.collection.address}`}>
    <div id="collection_row" className={s.container}>
      <div id="collection_row" className={s.box}>
        {is_loading && (
          <div className={s.loading_container}>
            <CircularProgress color="primary" />
          </div>
        )}
        <CollectionInfo collection={props.collection} />
        <PreviewGraph
          data_price={props.collection.data_price}
          data_volume={props.collection.data_volume}
          price_delta={props.collection.floor_price_delta}
        />

        <PriceInfo
          collection={props.collection}
          currency="eth"
          prices={props.collection.data_price}
        />
      </div>
    </div>
  );
}
