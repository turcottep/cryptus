import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";
import PreviewGraph from "../../market/market_viewer/collection_row/preview_graph/preview_graph";
import Graph from "../../market/graph/graph";
import { collection, intervals } from "../../../lib/data_types";

export default function Market(props: { networth: any; collections: any }) {
  const [newPropCollection, setnewPropCollection] = useState(props.collections);
  const [market_interval, set_market_interval] = useState(
    props.networth.active
  );

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

  const callbackGraph = async (interval) => {
    // setInterval(interval);
    const newPropCollectionTemp = await updatePrice(
      interval,
      () => {},
      props.collections
    );
    set_market_interval(interval);
    setnewPropCollection(newPropCollectionTemp);
  };

  useEffect(() => {
    callbackGraph(market_interval);
  }, []);

  return (
    <div className={s.market}>
      <AppHeader />
      <Modifiers />
      <Networth networth={props.networth} />
      <Collections data={newPropCollection} />
    </div>
  );
}

export const Networth = (props: { networth: any }) => {
  const n = props.networth;
  // console.log("networth", n);

  return (
    <div className={s.networth}>
      <div className={s.number}>
        <div className={s.num}>{n.value}</div>
        <div className={s.fiat}>CAD$</div>
        <div className={s.change}>{n.change}</div>
      </div>
      <div className={s.graph}>
        <Graph
          data_price={n.data_price}
          data_volume={null}
          color={n.change > 0 ? "green" : "red"}
          detailled={true}
        />
      </div>
    </div>
  );
};

export const Tile = (props: { c: any }) => {
  const { c } = props;
  // console.log("c", c);

  return (
    <div key={c.id}>
      <div className={s.tile}>
        <img className={s.bla} src={c.logo} />
        <div className={s.bla}>
          <div className={s.bla}>{c.name}</div>
          <div className={s.bla}>{c.ticker}</div>
        </div>
        <div className={s.graphic}>
          <Graph
            data_price={c.data_price}
            data_volume={null}
            color={c.floor_price_delta > 0 ? "green" : "red"}
            detailled={false}
          />
        </div>
        <div className={s.bla}>
          <div className={s.bla}>{c.floor_price}</div>
          <div className={s.bla}>{c.floor_price_delta}</div>
        </div>
      </div>
    </div>
  );
};

export const Collections = (props: { data: any }) => {
  return (
    <div className={s.collections}>
      {props.data.map((collection) => (
        <Tile c={collection} />
      ))}
    </div>
  );
};

export const AppHeader = () => {
  return (
    <Header>
      <div className={s.header}>
        <div className={s.bla}>logo</div>
        <div className={s.bla}>menu</div>
        <div className={s.bla}>icons</div>
      </div>
    </Header>
  );
};

export const Modifiers = () => {
  return (
    <div className={s.modifiers}>
      <div className={s.bla}>1M</div>
      <div className={s.bla}>filters</div>
      <div className={s.bla}>sort</div>
    </div>
  );
};
