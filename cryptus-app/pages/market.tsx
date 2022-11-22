import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";

import { collection, intervals } from "../lib/data_types";
import collectionDictionary from "../lib/collectionDictionary";
import address from "./api/collection/address";

import getCollectionData from "../lib/get_collection_data";
import { collection100list } from "../lib/collectionDictionary";

// Import market_overwiew parent component to test here
import Collection from "../components/testing/market/collection/collection";
import Search from "../components/testing/search/search";
import Market from "../components/testing/market/market";
import { Page } from "../components/testing/buildingblocks/buildingblocks";
import Modifiers from "../components/testing/market/modifiers/modifiers";

export default function MarketPage(props) {
  const [v, setV] = useState(0); //[0: market, 1: search, 2: modifiers, 3: collection]
  const [f, setF] = useState([(i) => setV(i), () => {}]);

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
        <Page>
          <Market
            networth={props.mock_data.networth}
            collections={props.collections}
          />
          <Search data={props.data} v={v == 1} />
          <Modifiers d={[]} f={f} v={v == 2} />
          <Collection c={props.data[0]} v={v == 3} />
        </Page>
      </main>
    </div>
  );
}

//LIST OF ALL PAGES ORIGINATING FROM PROFILE PAGE
//market, collection, search, modifiers

export async function getStaticProps() {
  const mock_data = {
    date: "April 20",
    networth: {
      EthCad: 1600,
      active: intervals.three_months,
      value: 400 * 1600,
      change: 400 - 100,
      data_price: [100, 200, 300, 400, 200, 100, 200, 300, 400],
    },
  };

  const collections_dict = collectionDictionary;
  const collections = Object.keys(collections_dict).map((key) => {
    return collections_dict[key];
  }) as collection[];

  try {
    return {
      props: {
        collections: collections,
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
