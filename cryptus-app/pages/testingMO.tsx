import React from "react";
// Import market_overwiew parent component to test here
import MarketOverview from "../components/market_overview/market_overview";

export default function Home() {
  const mock_data = {
    date: "April 20",
    networth: {
      EthCad: 4000,
      active: "day",
      value: "1337,69 $ CAD",
      change: "420.69 $ total",
    },
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
        <MarketOverview
          date={mock_data.date}
          networth={mock_data.networth}
          collections={[]}
        />
      </main>
    </div>
  );
}
