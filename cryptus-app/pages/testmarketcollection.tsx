import React from "react";
import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
import MarketCollection from "../components/market_overview/market_collection/market_collection";
import { collection } from "../components/market_viewer/market_viewer";

export default function Home() {
  const mock_props: collection = {
    id: "1",
    logo: "./images/BAYC.png",
    ticker: "BAYC",
    name: "Bored Ape Yacht Club",
    floor_price: 164285 / 3130.43,
    floor_price_delta: 6900 / 3130.43,
    timestamp: "Friday",
    address: "",
    data_price: [],
  };

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
        <MarketCollection summary_props={undefined} graph_props={undefined} />
      </main>
    </div>
  );
}
