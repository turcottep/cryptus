import React from "react";
import Graph from "../components/graph/graph";
import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
import { data_raw } from "../lib/data";

export default function Home({ data }) {
  //internal imports

  // parse data from "0     18462 2022-01-31 15:40:26         3.98           ETH    2549.53  0x63950ef80536bce5b4f0942ada77a5eeef7368ee9842af49ebbc2b6383e2bdde      1643661626" to "tokenid,timestamp_raw,total_price payment_token,usd_price,transaction_hash,timestamp_unix"
  const data_clean = data_raw.split("\n").map((row) => {
    const [
      tx_id,
      tokenid,
      timestamp_day,
      timestamp_time,
      total_price,
      payment_token,
      usd_price,
      transaction_hash,
      timestamp_unix,
    ] = row.split(/\s+/);
    return {
      tx_id,
      tokenid,
      timestamp_day,
      timestamp_time,
      total_price,
      payment_token,
      usd_price,
      transaction_hash,
      timestamp_unix,
    };
  });

  const all_prices = data_clean.map((row) => {
    return parseFloat(row.total_price);
  });

  const mock_volume = data_clean.map((row) => {
    return Math.random() * 100;
  });

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

      <main className="h-40 w-full mx-auto">
        <Graph
          data_price={all_prices}
          data_volume={mock_volume}
          detailled={true}
        />
      </main>
    </div>
  );
}
