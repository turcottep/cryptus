import React from "react";
import Graph from "../../components/graph/graph";
import MarketCollection from "../../components/market_overview/market_collection/market_collection";
import FeatureIamTesting from "../../components/template/pagetemplate/pagetemplate";
import { data_raw } from "../../lib/data";

export type market_collection_props = {
  collection_name: string;
  collection_logo: string;
  collection_ticker: string;
  floor_price_live: number;
  floor_price_delta: number;
  floor_price_timestamp: string;
  data_price: number[];
};

export default function Home(props: market_collection_props) {
  const { data_price } = props;

  const mock_volume = data_price.map((row) => {
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

      <main>
        <MarketCollection {...props} />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const address =
    context.query.address ?? "0x1a92f7381b9f03921564a437210bb9396471050c";
  console.log("address", address);

  const summary_props_mock = {
    collection_name: "Bored Ape Yacht Club",
    collection_logo: "./images/bayc-logo.png",
    collection_ticker: "BAYC",
    floor_price_live: 80.69,
    floor_price_delta: 2.4,
    floor_price_timestamp: "Friday",
    data_price: [],
  } as market_collection_props;

  try {
    const res = await fetch(process.env.BASE_URL + "api/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
      }),
    });
    const data = await res.json();
    const sale_prices = data
      .map((row) => {
        return parseFloat(row.total_price);
      })
      .reverse();

    //  average of 10 data points
    const nb_data = 200;
    const sales_smoothed = [0];
    const outpout_smoothed = [0];
    const alpha = 0.01;
    for (let i = 0; i < sale_prices.length; i++) {
      const new_value =
        sales_smoothed[i] * (1 - alpha) + sale_prices[i] * alpha;
      sales_smoothed.push(new_value);
      if (i % Math.floor(sale_prices.length / nb_data) === 0) {
        outpout_smoothed.push(new_value);
      }
    }

    summary_props_mock.data_price = outpout_smoothed;

    return {
      props: {
        ...summary_props_mock,
      },
    };
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("DEEZ");

    return {
      props: { sale_prices: null, summary_props: null },
    };
  }
}
