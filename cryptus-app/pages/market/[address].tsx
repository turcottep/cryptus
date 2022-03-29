import router, { Router } from "next/router";
import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Graph from "../../components/graph/graph";
import MarketCollection from "../../components/market_overview/market_collection/market_collection";
import FeatureIamTesting from "../../components/template/pagetemplate/pagetemplate";
import collectionDictionary from "../../lib/collectionDictionary";
import { data_raw } from "../../lib/data";
import Loading from "../../components/utils/loading/loading";
import get_base_url from "../../lib/get_base_url";

export type market_collection_props = {
  collection_name: string;
  collection_logo: string;
  collection_ticker: string;
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
  data_price: number[];
  count: number[];
  volume: number[];
  address: string;
};

export default function Home() {
  const props_empty = {
    collection_name: "",
    collection_logo: "",
    collection_ticker: "",
    floor_price_live: 0.0,
    floor_price_delta: 0.0,
    floor_price_timestamp: "",
    data_price: [0.0, 0.0],
    count: [0.0, 0.0],
    volume: [0.0, 0.0],
    address: "",
  } as market_collection_props;
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(true);
  const [loading, setLoading] = useState<Boolean>(false);
  const [prop, setProp] = useState(props_empty);
  const { address } = router.query;
  const addressString = address as string;
  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  // useEffect(() => {
  //   setLoading(true);
  //   async function getProps() {
  //     const viewingmode = "alltime";
  //     const collection_dict = collectionDictionary;
  //     const collection = collection_dict[addressString];
  //     console.log("Collection address debug:", addressString);
  //     console.log("Collection debug:", collection);
  //     const summary_props_mock = {
  //       collection_name: collection.name,
  //       collection_logo: collection.logo,
  //       collection_ticker: collection.ticker,
  //       floor_price_live: collection.floor_price,
  //       floor_price_delta: collection.floor_price_delta,
  //       floor_price_timestamp: collection.timestamp,
  //       data_price: [],
  //       count: null,
  //       volume: null,
  //       address: collection.address,
  //     } as market_collection_props;

  // try {
  //   const res = await fetch(get_base_url() + "/api/sales/", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       address: summary_props_mock.address,
  //       viewingmode,
  //     }),
  //   });
  //   const { price, count, volume } = await res.json();

  //   summary_props_mock.data_price = price;
  //   summary_props_mock.count = count;
  //   summary_props_mock.volume = volume;
  //   console.log(summary_props_mock);
  //   setProp(summary_props_mock);
  // } catch (err) {
  //   console.error(err);
  //   setProp(props_empty);
  // }
  // }

  //   if (addressString) {
  //     getProps();
  //   }
  //   setLoading(false);
  // }, [address]);

  return (
    <div className="">
      <title>Public Wallet</title>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
      <meta name="description" content="" />
      <meta name="keywords" content="" />
      <meta name="author" content="" />
      <meta name="theme-color" content="" />
      <meta
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
        name="viewport"
      />

      <link
        href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
        rel="stylesheet"
      />

      <main>
        {loading && <Loading />}
        {addressString ? (
          <MarketCollection
            market_collection_props={props_empty}
            isMobile={isMobile}
          />
        ) : (
          <div />
        )}
      </main>
    </div>
  );
}
