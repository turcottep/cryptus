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
import SearchIcon from "../basic/header/search_icon/search_icon";

import findAllUsers from "../../lib/findAllUsers";
import Graph from "./graph/graph";
import { Page } from "../building_blocks/building_blocks";
import Card from "../utils/card/card";
import { Search } from "@mui/icons-material";
import TimeInterval from "./market_header/time_interval/time_interval";

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
    collections_list: [],
    collections_address_list: [],
    profile_image_url: "",
    networth: 0,
    networth_history: [0, 0],
  };

  const today = new Date();
  // get day like August 1
  const day = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
  });

  const [session, session_status] = useSession();
  const [user, setUser] = useState(props_user_empty);

  const [loading, setLoading] = useState(false);
  const [show_card, set_show_card] = useState(false);
  const [card_collection, set_card_collection] = useState(null);

  const [sorting_filter, set_sorting_filter] = useState("fp_d");

  const [market_interval, set_market_interval] = useState(
    props.networth.active
  );
  const [show_card_settings, set_show_settings] = useState(false);
  const [show_card_wallet_manager, set_show_wallet_manager] = useState(false);
  const [show_card_support, set_show_support] = useState(false);
  const [show_card_search, set_show_search] = useState(false);
  const [show_card_collection_search, set_show_card_collection_search] =
    useState(false);

  // ************************  search bar stuf
  const [usersProfiles, setUsersProfiles] = useState<dbUsers[]>([]);
  useEffect(() => {
    const getAllUsers = async () => {
      let allUsers = await findAllUsers();
      setUsersProfiles(allUsers);
    };
    getAllUsers();
  }, []);
  // ************************ end search bar stuff

  console.log("loading", loading);

  const update_for_user = async (username: string) => {
    // console.log("update_for_user", username);

    const user = await get_user_by_username(username);
    console.log("user : ", user);
    const user_collections = user.collections_address_list;
    // console.log("user_collections : ", user_collections);

    for (const collection of props.collections) {
      collection.user_owned = user_collections.includes(collection.address);
    }

    // console.log("networth : ", user.networth);
    // console.log("networth_history : ", user.networth_history);
    setUser(user);
  };

  useEffect(() => {
    if (session) {
      const user_name = session.user.name;
      console.log("user_name", user_name);
      update_for_user(user_name);
    }
  }, [session_status]);

  useEffect(() => {
    callbackGraph(market_interval);
  }, []);

  const callbackGraph = async (interval) => {
    // setInterval(interval);

    if (loading) {
      console.log(
        "callback: too fast, wait for the previous request to finish"
      );
      return;
    }

    setLoading(true);

    console.log("updating interval", interval);

    for (const collection of props.collections) {
      collection.data_price = [0, 0];
    }
    // setnewPropCollection([...newPropCollection]);

    await updatePrice(interval, props.collections);
    set_market_interval(interval);
    // setnewPropCollection(newPropCollectionTemp);

    setLoading(false);
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

  const toggle_search = () => {
    set_show_search(!show_card_search);
  };

  const close_wallet = () => {
    set_show_wallet_manager(false);
  };

  const close_support = () => {
    set_show_support(false);
  };

  const toggle_settings = () => {
    set_show_settings(!show_card_settings);
  };

  const open_support = () => {
    set_show_support(true);
  };

  const open_wallet_manager = () => {
    set_show_wallet_manager(true);
  };

  const open_card = (collection_name: string) => {
    console.log("open card:", collection_name);
    const collection = props.collections.find(
      (c) => c.name === collection_name
    );
    set_card_collection(collection);
    set_show_card(true);
  };

  // console.log("card_collection", card_collection);

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
        slug: card_collection.slug,
      }
    : ({} as any);

  return (
    // <div className={show_card ? s.container_no_scroll : s.container}>
    <Page>
      <DesktopHeader
        tab="market"
        toggle_settings={toggle_settings}
        toggle_search={toggle_search}
        isMobile={props.isMobile}
      />
      <div className={s.market_container}>
        <div className={s.date_container}>
          <div>{user.username}</div>
          <div>{day}</div>
        </div>
        <div className={s.networth}>
          <div className={s.number}>
            <div className={s.num}>
              {user
                ? user.networth_history[
                    user.networth_history.length - 1
                  ].toFixed(1)
                : "-"}
            </div>
            <div className={s.fiat}>ETH</div>
            <div className={s.change}>
              {(
                (100 *
                  (user.networth_history[user.networth_history.length - 1] -
                    user.networth_history[0])) /
                (user.networth_history[0] + 0.00000001)
              ).toFixed(2)}
              %
            </div>
          </div>
          <div className={s.graph}>
            <Graph
              data_price={user.networth_history}
              data_volume={[]}
              color={
                user.networth_history[user.networth_history.length - 1] -
                  user.networth_history[0] >=
                0
                  ? "green"
                  : "red"
              }
              detailled={true}
            />
          </div>
        </div>

        <TimeInterval
          active={props.networth.active}
          callback={callbackGraph}
          loading={loading}
        />

        <div className={s.search_and_sort}>
          <div
            onClick={() => {
              set_show_card_collection_search(true);
            }}
          >
            <Search />
          </div>
          <SortButton
            callback={(filter) => {
              console.log("filter", filter);
              set_sorting_filter(filter);
            }}
          />
        </div>
      </div>
      <MarketCollections
        setLoading={setLoading}
        interval={props.networth.active}
        callback={open_card}
        name={"My Collections"}
        icon={"/icons/favorite_icon.png"}
        collections={props.collections
          .filter((c) => {
            return c.user_owned;
          })
          .sort((a, b) => {
            return sort_market_collections(a, b, sorting_filter);
          })}
        connected={!!session}
      />
      <MarketCollections
        setLoading={setLoading}
        interval={props.networth.active}
        callback={open_card}
        name={"Market"}
        icon={"/icons/market_icon.png"}
        collections={props.collections
          .filter((c) => {
            return !c.user_owned;
          })
          .sort((a, b) => {
            return sort_market_collections(a, b, sorting_filter);
          })}
      />
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
      {show_card_collection_search && (
        <Card
          isMobile={isMobile}
          callback_close={() => {
            set_show_card_collection_search(false);
          }}
        >
          <SearchBar callback={open_card} collections={props.collections} />
        </Card>
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
    </Page>
  );
  //DONEDO: Change <div className={s.change}>{networth}</div> to use real % change # DONE
  //DONEDO: Get real data for user (to have username) copy paste find -> user.username to find it on the page
  //DONEDO: Change time interval to 1D, 1W, 1M, 3M, 1Y # on a pas le data 1D, c'est pas assez long
  //TODO: Fix <Collapsable/> for it not to be closed after closing a collection pop-up
  //DONEDO: Add a graph of historical networth here
}
export type graph = {
  collection_name: string;
  collection_logo: string;
  collection_ticker: string;
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
  data_price: number[];
  interval: intervals;
  count: number[];
  volume: number[];
  address: string;
};

export const updatePrice = async (
  interval: intervals,
  collections: collection[]
) => {
  // console.log("Collections to Update: ", collections);
  let viewingmode = intervals[interval];
  if (viewingmode == "three_months") {
    viewingmode = "3month";
  }

  // setPrice(price);
  const adresses = collections.map((c) => {
    return c.address;
  });

  // console.log("adresses ", adresses);
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
  const res_object = await res.json();
  // console.log("res_object ", res_object);
  const { prices, counts, deltas } = res_object;
  // const newPropCollectionTemp = [];

  if (collections.length > 0) {
    for (let i = 0; i < collections.length; i++) {
      const element = collections && collections[i];
      // console.log("element ", element);

      element.data_price = prices && prices[i];
      // element.floor_price = prices && prices[i][prices[i].length - 1];
      element.floor_price_delta = deltas && deltas[i];
      // newPropCollectionTemp.push(element);
    }
  }

  // console.log("collection updated ", newPropCollectionTemp);
  // return newPropCollectionTemp;
};

export const sort_market_collections = (coll_a, coll_b, filter: string) => {
  let ans = 0;

  switch (filter) {
    case "name_a":
      // newPropCollectionMarketTemp.sort((a, b) =>
      ans = coll_a.name.toLowerCase() > coll_b.name.toLowerCase() ? 1 : -1;
      // );
      // newPropCollectionFavoriteTemp.sort((a, b) =>
      //   a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1
      // );
      break;
    case "name_d":
      // newPropCollectionMarketTemp.sort((a, b) =>
      ans = coll_a.name.toLowerCase() < coll_b.name.toLowerCase() ? 1 : -1;
      // );
      // newPropCollectionFavoriteTemp.sort((a, b) =>
      //   coll_a.name.toLowerCase() < coll_b.name.toLowerCase() ? 1 : -1
      // );
      break;
    case "fp_a":
      // newPropCollectionMarketTemp.sort((a, b) =>
      ans = coll_a.floor_price > coll_b.floor_price ? 1 : -1;
      // );
      // newPropCollectionFavoriteTemp.sort((a, b) =>
      //   coll_a.floor_price > coll_b.floor_price ? 1 : -1
      // );
      break;
    case "fp_d":
      ans = coll_a.floor_price < coll_b.floor_price ? 1 : -1;

      break;
    case "delta_a":
      ans =
        coll_a.floor_price_delta / coll_a.floor_price >
        coll_b.floor_price_delta / coll_b.floor_price
          ? 1
          : -1;

      break;
    case "delta_d":
      ans =
        coll_a.floor_price_delta / coll_a.floor_price <
        coll_b.floor_price_delta / coll_b.floor_price
          ? 1
          : -1;

      break;

    default:
    // code block
  }

  // const new_name = view + "-" + filter;
  // console.log("view", view, "sort_market_collections", new_name);

  // for (let i = 0; i < newPropCollectionMarketTemp.length; i++) {
  //   // console.log(newPropCollectionMarketTemp[i].name, i);

  //   newPropCollectionMarketTemp[i][new_name] = i;
  // }

  // console.log("supposed to be", newPropCollectionMarketTemp);

  // return [newPropCollectionFavoriteTemp, newPropCollectionMarketTemp];
  return ans;
};
