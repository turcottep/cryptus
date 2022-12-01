import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";

import Market from "../components/market/market";

import { collection, intervals } from "../lib/data_types";
import collectionDictionary from "../lib/collectionDictionary";
import address from "./api/collection/address";

import getCollectionData from "../lib/get_collection_data";
import get_collections_dict from "../lib/collectionDictionary";

export default function MarketPage(props) {
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
      <meta
        name="description"
        content="The new way to check up on your networth in a matter of seconds. "
      />
      <meta
        name="keywords"
        content="
        NFT Market Overview
        ETH
        NFT Market Price
        NFT Market tracker
      "
      />
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
        <Market
          date={props.mock_data.date}
          networth={props.mock_data.networth}
          collections={props.collections}
          isMobile={isMobile}
        />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const mock_data = {
    date: "April 20",
    networth: {
      EthCad: 4000,
      active: intervals.three_months,
      value: "1337,69 $ CAD",
      change: "420.69 $ total",
    },
  };

  const collections_dict = get_collections_dict();
  const collections = Object.keys(collections_dict).map((key) => {
    return collections_dict[key];
  }) as collection[];

  try {
    return {
      props: {
        collections: collections, //.slice(0, 20),
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
