// Importer le market_viewer et le footer (commun)
//react and css
import React, { useState, useEffect } from "react";
import s from "./market_overview.module.scss";

//external exports

//internal imports
import MarketHeader from "./market_header/market_header";
import NetWorth from "./net_worth/net_worth";
import SearchBar from "./search_bar/search_bar";
import SortButton from "./sort_button/sort_button";
import MarketViewer, { collection } from "../market_viewer/market_viewer";
import { intervals } from "./net_worth/time_interval/time_interval";

type market_overview_props = {
  date: string;
  networth: {
    EthCad: number;
    active: intervals;
    value: string;
    change: string;
  };
  collections: collection[];
};

export default function MarketOverview(props: market_overview_props) {
  return (
    <div className={s.container}>
      <MarketHeader date={props.date} />
      <NetWorth
        value={props.networth.value}
        delta={props.networth.change}
        EthCad={props.networth.EthCad}
        active={props.networth.active}
      />
      <div className={s.container_row}>
        <SearchBar />
        <SortButton />
      </div>
      <MarketViewer collections={props.collections} />
    </div>
  );
}
