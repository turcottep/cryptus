import router, { Router } from "next/router";
import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import MarketCollection from "../../components/market_overview/market_collection/market_collection";
import Loading from "../../components/utils/loading/loading";

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

  return (
    <div>
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
