import React from "react";
import Graph from "../../components/graph/graph";
import MarketCollection from "../../components/market_overview/market_collection/market_collection";
import FeatureIamTesting from "../../components/template/pagetemplate/pagetemplate";
import collectionDictionary from "../../lib/collectionDictionary";
import { data_raw } from "../../lib/data";

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

export default function Home(props: market_collection_props) {
  const { data_price } = props;

  const mock_volume = data_price
    ? data_price.map((row) => {
        return Math.random() * 100;
      })
    : [];

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
  const viewingmode = "alltime";
  console.log("address", address);
  const collection_dict = collectionDictionary;
  const collection = collection_dict[address];
  const summary_props_mock = {
    collection_name: collection.name,
    collection_logo: collection.logo,
    collection_ticker: collection.ticker,
    floor_price_live: collection.floor_price,
    floor_price_delta: collection.floor_price_delta,
    floor_price_timestamp: collection.timestamp,
    data_price: [],
    count: null,
    volume: null,
    address: address,
  } as market_collection_props;

  try {
    const res = await fetch(process.env.BASE_URL + "api/sales/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address,
        viewingmode,
      }),
    });
    const { price, count, volume } = await res.json();

    summary_props_mock.data_price = price;
    summary_props_mock.count = count;
    summary_props_mock.volume = volume;

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
      props: {
        collection_name: "",
        collection_logo: "",
        collection_ticker: "",
        floor_price_live: 0,
        floor_price_delta: 0,
        floor_price_timestamp: "",
        data_price: [],
      },
    };
  }
}
