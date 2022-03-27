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
import DesktopHeader from "../header/desktop_header/desktop_header";
import Loading from "../utils/loading/loading";
import MarketCollection from "./market_collection/market_collection";

type market_overview_props = {
  date: string;
  networth: {
    EthCad: number;
    active: intervals;
    value: string;
    change: string;
  };
  collections: collection[];
  isMobile: boolean;
};

export default function MarketOverview(props: market_overview_props) {
  const { isMobile } = props;
  const [price, setPrice] = useState([]);
  // const [interval, setInterval] = useState(props.networth.active);
  const [newPropCollection, setnewPropCollection] = useState<collection[]>(
    props.collections
  );

  const [loading, setLoading] = useState(false);
  const [show_card, set_show_card] = useState(-1);

  useEffect(() => {
    //do backend call
    //setloading true
  }, []);

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

  const close_card = () => {
    console.log("close card");
    set_show_card(-1);
  };

  const open_card = (i) => {
    console.log("open card");
    set_show_card(i);
  };

  return (
    <div className={s.container}>
      {isMobile ? null : <DesktopHeader tab="market" />}
      {loading && <Loading />}
      {show_card !== -1 && (
        <MarketCollection
          isMobile={false}
          callback_close={close_card}
          market_collection_props={{
            collection_name: newPropCollection[show_card].name,
            collection_logo: newPropCollection[show_card].logo,
            collection_ticker: newPropCollection[show_card].ticker,
            floor_price_live: newPropCollection[show_card].floor_price,
            floor_price_delta: newPropCollection[show_card].floor_price_delta,
            floor_price_timestamp: newPropCollection[show_card].timestamp,
            data_price: newPropCollection[show_card].data_price,
            count: [],
            volume: newPropCollection[show_card].data_volume,
            address: newPropCollection[show_card].address,
          }}
        />
      )}
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
      <MarketViewer collections={newPropCollection} callback_open={open_card} />
      {isMobile ? <Footer /> : null}
    </div>
  );
}
