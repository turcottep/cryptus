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
import { useSession } from "next-auth/client";
import get_user_by_username from "../../lib/get_user_by_username";
import DesktopHeader from "../header/desktop_header/desktop_header";
import Loading from "../utils/loading/loading";

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

  const [session, status] = useSession();
  const [username, setUsername] = useState<string>("");
  const [user_collections_list, set_user_collections_list] = useState<string[]>(
    ["0x1a92f7381b9f03921564a437210bb9396471050c"]
  );
  const [newPropCollection, setnewPropCollection] = useState(props.collections);
  const [newPropCollectionFavorite, setnewPropCollectionFavorite] = useState(
    []
  );
  const [newPropCollectionMarket, setnewPropCollectionMarket] = useState(
    props.collections
  );

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    updatePrice(props.networth.active);
  }, []);
  
  useEffect(() => {
    if (session) {
      const user_name = session.user.name;
      update_for_user(user_name);
      setUsername(user_name);
    }
  }, [status]);

  useEffect(() => {
    const newPropCollectionFavoriteTemp = [];
    const newPropCollectionMarketTemp = [];
    for (const collection of newPropCollection) {
      if (user_collections_list.includes(collection.address)) {
        newPropCollectionFavoriteTemp.push(collection);
      } else {
        newPropCollectionMarketTemp.push(collection);
      }
    }
    setnewPropCollectionFavorite(newPropCollectionFavoriteTemp);
    setnewPropCollectionMarket(newPropCollectionMarketTemp);
  }, [user_collections_list, newPropCollection]);

  const update_for_user = async (user_name: string) => {
    const user = await get_user_by_username(user_name);
    const user_collections = user.collections_list;
    console.log("user_collections", user_collections);
    set_user_collections_list(user_collections);
  };

  // const [interval, setInterval] = useState(props.networth.active);

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

    const { prices, counts, delta } = await res.json();

    if (prices) {
      const newPropCollectionTemp = [];

      for (let i = 0; i < props.collections.length; i++) {
        const element = props.collections[i];
        element.data_price = prices[i];
        element.floor_price_delta = delta[i];
        newPropCollectionTemp.push(element);
      }
      setnewPropCollection(newPropCollectionTemp);
    }
  };

  const callbackGraph = async (interval) => {
    // setInterval(interval);
    console.log("update price");

    updatePrice(interval);
  };

  return (
    <div className={s.container}>
      {isMobile ? null : <DesktopHeader tab="market" />}
      {loading && <Loading />}
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
      <MarketViewer
        collections_market={newPropCollectionMarket}
        collections_favorite={newPropCollectionFavorite}
      />
      <Footer />
    </div>
  );
}
