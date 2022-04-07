// Importer le market_viewer et le footer (commun)
//react and css
import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

//external exports
import { useSession } from "next-auth/client";

//internal imports
import { intervals } from "./net_worth/time_interval/time_interval";
import { collection } from "../../lib/data_types";

import MarketHeader from "./market_header/market_header";
import NetWorth from "./net_worth/net_worth";
import SearchBar from "./search_bar/search_bar";
import SortButton from "./sort_button/sort_button";
import Footer from "../basic/footer/footer";
import DesktopHeader from "../basic/header/desktop_header/desktop_header";
import Loading from "../utils/loading/loading";
import MarketCollection from "./market_collection/market_collection";
import MarketCollections from "./market_viewer/market_collections/market_collections";
import get_user_by_username from "../../lib/get_user_by_username";

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

  const [user_collections_list, set_user_collections_list] = useState<string[]>(
    []
  );

  // const [interval, setInterval] = useState(props.networth.active);
  const [newPropCollection, setnewPropCollection] = useState(props.collections);
  const [newPropCollectionFavorite, setnewPropCollectionFavorite] = useState(
    []
  );
  const [newPropCollectionMarket, setnewPropCollectionMarket] = useState(
    props.collections
  );

  const [session, status] = useSession();
  const [username, setUsername] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [show_card, set_show_card] = useState(false);
  const [card_collection, set_card_collection] = useState(null);
  const [networth, set_networth] = useState(0);
  const [market_interval, set_market_interval] = useState(
    props.networth.active
  );

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

  useEffect(() => {
    const newPropCollectionTemp = update();
  }, []);

  const update = async (interval: intervals = props.networth.active) =>
    await updatePrice(interval, setLoading, props.collections);

  const callbackGraph = async (interval) => {
    // setInterval(interval);
    const newPropCollectionTemp = await update(interval);
    set_market_interval(interval);
    setnewPropCollection(newPropCollectionTemp);
  };

  const update_for_user = async (username: string) => {
    const user = await get_user_by_username(username);
    console.log("user : ", user);
    const user_collections = user.collections_list;
    const networth = user.networth;
    console.log("networth : ", networth);
    set_user_collections_list(user_collections);
    set_networth(networth);
  };

  const close_card = () => {
    console.log("close card");
    set_show_card(false);
  };

  const open_card = (collection_name: string) => {
    console.log("open card:", collection_name);
    const collection = newPropCollection.find(
      (c) => c.name === collection_name
    );
    set_card_collection(collection);
    set_show_card(true);
  };

  const marketCollectionProps = card_collection
    ? {
        collection_name: card_collection.name,
        collection_logo: card_collection.logo,
        collection_ticker: card_collection.ticker,
        floor_price_live: card_collection.floor_price,
        floor_price_delta: card_collection.floor_price_delta,
        floor_price_timestamp: card_collection.timestamp,
        data_price: card_collection.data_price,
        interval: market_interval,
        count: [],
        volume: card_collection.data_volume,
        address: card_collection.address,
      }
    : ({} as any);

  console.log("session", session);

  return (
    <div className={show_card ? s.container_no_scroll : s.container}>
      {isMobile ? null : <DesktopHeader tab="market" />}
      {loading && <Loading />}
      {show_card && (
        <MarketCollection
          isMobile={isMobile}
          callback_close={close_card}
          market_collection_props={marketCollectionProps}
        />
      )}
      <MarketHeader />
      <NetWorth
        value={networth}
        // delta={props.networth.change}
        // EthCad={props.networth.EthCad}
        active={props.networth.active}
        callbackGraph={callbackGraph}
      />
      <div className={s.search_and_sort}>
        <SearchBar />
        <SortButton
          newPropCollectionFavorite={newPropCollectionFavorite}
          newPropCollectionMarket={newPropCollectionMarket}
          setnewPropCollectionFavorite={setnewPropCollectionFavorite}
          setnewPropCollectionMarket={setnewPropCollectionMarket}
        />
      </div>
      <MarketCollections
        callback={open_card}
        name={"My Collections"}
        icon={"/icons/favorite_icon.png"}
        collections={newPropCollectionFavorite}
        connected={!!session}
      />
      <MarketCollections
        callback={open_card}
        name={"Market"}
        icon={"/icons/market_icon.png"}
        collections={newPropCollectionMarket}
      />
      {isMobile ? <Footer /> : null}
    </div>
  );
}

const updatePrice = async (
  interval: intervals,
  setLoading: Function,
  collections: collection[]
) => {
  setLoading(true);
  let viewingmode = intervals[interval];
  if (viewingmode == "three_months") {
    viewingmode = "3month";
  }
  console.log("new viewingmode : ", viewingmode);

  // setPrice(price);
  const adresses = collections.map((c) => {
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

  const { prices, counts, deltas } = await res.json();
  const newPropCollectionTemp = [];

  for (let i = 0; i < collections.length; i++) {
    const element = collections[i];
    element.data_price = prices[i];
    element.floor_price = prices[i][prices[i].length - 1];
    element.floor_price_delta = deltas[i];
    newPropCollectionTemp.push(element);
  }
  setLoading(false);

  return newPropCollectionTemp;
};
