// Importer le market_viewer et le footer (commun)
//react and css
import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

//external exports
import { useSession } from "next-auth/client";

//internal imports
import { user, intervals, collection, dbUsers } from "../../lib/data_types";

import SearchBar from "./search_bar/search_bar";
import SortButton from "./sort_button/sort_button";
import Footer from "../basic/footer/footer";
import DesktopHeader from "../basic/header/desktop_header/desktop_header";
import Loading from "../utils/loading/loading";
import MarketCollection from "./market_collection/market_collection";
import getUserByUsername from "../../lib/get_user_by_username";

import get_profile_props from "../../lib/get_profile_props";
import Settings from "../basic/settings/settings";
import WalletManager from "../basic/wallet_manager/wallet_manager";
import MarketCollections from "./market_viewer/market_collections/market_collections";
import Support from "../basic/support/support";
import get_user_by_username from "../../lib/get_user_by_username";
import DateComponent from "./market_header/date/date";
import TimeInterval from "./market_header/time_interval/time_interval";
import SearchIcon from "../basic/header/search_icon/search_icon";

import findAllUsers from "../../lib/findAllUsers";
import calculate_networth from "../../lib/networth";

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

  const props_user_empty: user = {
    username: "",
    address: "",
    collections_filter: [],
    profile_image_url: "",
  };

  const today = new Date();
  // get day like August 1
  const day = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [user_collections_list, set_user_collections_list] = useState<string[]>(
    []
  );

  const [newPropCollection, setnewPropCollection] = useState(props.collections);
  const [newPropCollectionFavorite, setnewPropCollectionFavorite] = useState(
    []
  );
  const [newPropCollectionMarket, setnewPropCollectionMarket] = useState(
    props.collections
  );

  const [session, status_status] = useSession();
  const [username, setUsername] = useState<string>("");
  const [user, setUser] = useState(props_user_empty);
  const [loading, setLoading] = useState(false);
  const [show_card, set_show_card] = useState(false);
  const [card_collection, set_card_collection] = useState(null);
  const [networth, set_networth] = useState(0);
  const [market_interval, set_market_interval] = useState(
    props.networth.active
  );
  const [show_card_settings, set_show_settings] = useState(false);
  const [show_card_wallet_manager, set_show_wallet_manager] = useState(false);
  const [show_card_support, set_show_support] = useState(false);
  const [show_card_search, set_show_search] = useState(false);

  const [usersProfiles, setUsersProfiles] = useState<dbUsers[]>([]);

  useEffect(() => {
    const getUser = async (username: string) => {
      let profileProps = await get_profile_props(username);
      setUser(profileProps.props.user);
    };
    if (session) {
      const user_name = session.user.name;
      console.log("user_name", user_name);

      update_for_user(user_name);
      setUsername(user_name);
    }
  }, [status_status]);

  const updateUserCollections = (user_collections) => {
    const newPropCollectionFavoriteTemp = [];
    const newPropCollectionMarketTemp = [];
    for (const collection of newPropCollection) {
      if (user_collections.includes(collection.name)) {
        newPropCollectionFavoriteTemp.push(collection);
      } else {
        newPropCollectionMarketTemp.push(collection);
      }
    }
    console.log("temp", newPropCollectionFavoriteTemp, user_collections);
    setnewPropCollectionFavorite(newPropCollectionFavoriteTemp);
    setnewPropCollectionMarket(newPropCollectionMarketTemp);
  };

  useEffect(() => {
    const newPropCollectionTemp = update();
    updateUserCollections([]);
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      let allUsers = await findAllUsers();
      setUsersProfiles(allUsers);
    };
    getAllUsers();
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
    console.log("iuser collections : ", user_collections);
    const networth = user.networth;
    //const networth = await calculate_networth(user_collections); // For fetch tests
    console.log("networth : ", networth);
    set_user_collections_list([...user_collections]);
    set_networth(networth);
    updateUserCollections(user_collections);
  };

  const close_card = () => {
    set_show_card(false);
  };

  const close_all = () => {
    set_show_card(false);
    set_show_settings(false);
    set_show_wallet_manager(false);
    set_show_search(false);
  };

  const open_search = () => {
    set_show_search(true);
  };

  const close_wallet = () => {
    set_show_wallet_manager(false);
  };

  const close_support = () => {
    set_show_support(false);
  };

  const open_settings = () => {
    set_show_settings(true);
  };

  const open_support = () => {
    set_show_support(true);
  };

  const open_wallet_manager = () => {
    set_show_wallet_manager(true);
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

  return (
    <div className={show_card ? s.container_no_scroll : s.container}>
      {isMobile ? null : (
        <DesktopHeader
          tab="market"
          open_settings={open_settings}
          open_search={open_search}
        />
      )}
      <div className={s.containee}>
        {loading && <Loading />}
        {show_card && (
          <MarketCollection
            isMobile={isMobile}
            callback_close={close_card}
            market_collection_props={marketCollectionProps}
          />
        )}
        {show_card_settings && (
          <Settings
            isMobile={isMobile}
            callback_close={close_all}
            open_wallet_manager={open_wallet_manager}
            open_support={open_support}
          />
        )}
        {show_card_search && (
          <SearchIcon
            isMobile={isMobile}
            callback_close={close_all}
            users={usersProfiles}
          />
        )}
        {show_card_wallet_manager && (
          <WalletManager
            user={user}
            callback_close_wallet={close_wallet}
            isMobile={isMobile}
          />
        )}
        {show_card_support && (
          <Support callback_close_support={close_support} isMobile={isMobile} />
        )}
        <div className={s.market_container}>
          <div className={s.date_container}>
            <div className={s.date_box}>
              <DateComponent date={day} />
            </div>
          </div>
          <div className={s.networth_container}>
            <div className={s.networth}>{networth.toFixed(1) + "Ξ"}</div>
            <div className={s.networth_text}>{"NETWORTH"}</div>
          </div>

          <div className={s.time_container}>
            <div className={s.time_box}>
              <TimeInterval
                active={props.networth.active}
                callback={callbackGraph}
              />
            </div>
          </div>
          <div className={s.search_and_sort}>
            <SearchBar
              callback={open_card}
              collections={newPropCollectionMarket}
            />
            {/* <SearchBar users={usersProfiles} /> */}
            <SortButton
              newPropCollectionFavorite={newPropCollectionFavorite}
              newPropCollectionMarket={newPropCollectionMarket}
              setnewPropCollectionFavorite={setnewPropCollectionFavorite}
              setnewPropCollectionMarket={setnewPropCollectionMarket}
            />
          </div>
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

  if (collections.length > 0) {
    for (let i = 0; i < collections.length; i++) {
      const element = collections && collections[i];
      element.data_price = prices && prices[i];
      element.floor_price = prices && prices[i][prices[i].length - 1];
      element.floor_price_delta = deltas[i];
      newPropCollectionTemp.push(element);
    }
  }

  setLoading(false);

  return newPropCollectionTemp;
};
