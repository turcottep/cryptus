import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";

import MarketOverview from "../../components/market_overview/market_overview";
import { intervals } from "../../components/market_overview/net_worth/time_interval/time_interval";
import { collection } from "../../components/market_viewer/market_viewer";
import collectionDictionary from "../../lib/collectionDictionary";

// Import market_overwiew parent component to test here

export default function Market(props) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

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
        <MarketOverview
          date={props.mock_data.date}
          networth={props.mock_data.networth}
          collections={props.collections}
          isMobile={isMobile}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps() {
  const address = "0x1a92f7381b9f03921564a437210bb9396471050c";
  console.log("address", address);

  const mock_data = {
    date: "April 20",
    networth: {
      EthCad: 4000,
      active: intervals.week,
      value: "1337,69 $ CAD",
      change: "420.69 $ total",
    },
  };

  const collections_dict = collectionDictionary;
  const collections = Object.keys(collections_dict).map((key) => {
    return collections_dict[key];
  });

  const collections_mock = collections as collection[];

  try {
    return {
      props: {
        collections: collections_mock,
        mock_data: mock_data,
      },
    };
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("DEEZ");

    return {
      props: {
        sale_prices: null,
        summary_props: null,
        collections: null,
        mock_data: {
          date: "",
          networth: {
            EthCad: 0,
            active: "day",
            value: "0.00 $ CAD",
            change: "00.00 $ total",
          },
        },
      },
    };
  }
}
