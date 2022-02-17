import React, { useState, useEffect } from "react";
import s from "./market_collection_infos.module.scss";



export default function MarketCollectionInfos(props: {collection_logo:string, collection_ticker:string, collection_name:string}) {
  return (
    <div className={s.container}>
      <img src={props.collection_logo} className={s.image}></img>
      <div className={s.ticker}>
          {props.collection_ticker}
      </div>
      <div className={s.name}>
          {props.collection_name}
      </div>
    </div>
  );
}