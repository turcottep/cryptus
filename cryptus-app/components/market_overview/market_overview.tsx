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
import { each } from "jquery";
import Footer from "../footer/footer";

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
  const [price, setPrice] = useState([]);
  // const [interval, setInterval] = useState(props.networth.active);
  const [newPropCollection, setnewPropCollection] = useState(props.collections);

  useEffect(() => {
    updatePrice(props.networth.active);
  }, []);

  const updatePrice = async (interval: intervals) => {
    let viewingmode = intervals[interval];
    if (viewingmode == "three_months") {
      viewingmode = "3month";
    }
    console.log("new viewingmode : ", viewingmode);

    // setPrice(price);
    const adresses = props.collections.map((c) => {
      return c.address;
    });

    const res = await fetch("/api/sales/batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        adresses,
        viewingmode,
      }),
    });

    const { prices, counts } = await res.json();
    const newPropCollectionTemp = [];

    for (let i = 0; i < props.collections.length; i++) {
      const element = props.collections[i];
      element.data_price = prices[i];
      newPropCollectionTemp.push(element);
    }

    setnewPropCollection(newPropCollectionTemp);
  };

  const callbackGraph = async (interval) => {
    // setInterval(interval);
    updatePrice(interval);
  };

  return (
    <div className={s.container}>
      <MarketHeader />
      <NetWorth
        value={props.networth.value}
        delta={props.networth.change}
        EthCad={props.networth.EthCad}
        active={props.networth.active}
        callbackGraph={callbackGraph}
      />
      <div className={s.container_row}>
        <SearchBar />
        <SortButton />
      </div>
      <MarketViewer collections={newPropCollection} />
      <Footer />
    </div>
  );
}
