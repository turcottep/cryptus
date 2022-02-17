import React from "react";
import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
import MarketCollection from "../components/market_overview/market_collection/market_collection";

export default function Home() {
  const mock_props = {
    collection_name:'Bored Ape Yacht Club',
    collection_logo:'./images/bayc-logo.png',
    collection_ticker:'BAYC',
    floor_price_live:80.69,
    floor_price_delta:2.4,
    floor_price_timestamp:"Friday"
  }

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
        <MarketCollection {...mock_props}/>
      </main>
    </div>
  );
}
