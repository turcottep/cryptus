import { Router, useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import { isMobile as mobile } from "react-device-detect";

import Market from "../components/market/market";

import { collection, intervals } from "../lib/data_types";
import collectionDictionary from "../lib/collectionDictionary";
import address from "./api/collection/address";

import getCollectionData from "../lib/get_collection_data";
import get_collections_dict from "../lib/collectionDictionary";
import Head from "next/head";

export default function MarketPage(props) {
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  return (
    <main>
      <Head>
        <title>Market</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable='yes', maximum-scale=5.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Esiest way to track your NFTs. 
            The new way to check up on your networth in a matter of seconds. 
            Share your holdings with the ones who matter the most."
        />
        <meta
          name="keywords"
          content="NFT Market Overview
            ETH
            ECR-
            Eutereum wallet
            NFT Market Price
            NFT Market tracker
            NFT wallet viewer
            metamask
            Show NFT
            app for nft
            check my nft
            PublicWallet 
            public wallet
            NFT Viewer
            NFT wallet
            Blockchain wallet
            profile links
            NFT links
            NFT marketplace
          
            metamask public address
            public wallet address
            public crypto wallet
            gary vee public wallet
            wallet public key
            crypto wallet public address
            public wallet address metamask
            "
        />
        <meta name="author" content="CryptUS!" />
        <meta name="theme-color" content="#FFFDF5" />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
          rel="stylesheet"
        />
      </Head>
      <Market
        date={props.mock_data.date}
        networth={props.mock_data.networth}
        collections={props.collections}
        isMobile={isMobile}
      />
    </main>
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
