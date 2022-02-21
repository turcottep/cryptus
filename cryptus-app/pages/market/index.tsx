import React from "react";
import MarketOverview from "../../components/market_overview/market_overview";
import { collection } from "../../components/market_viewer/market_viewer";
// Import market_overwiew parent component to test here

export default function Home(props) {
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
        />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const address =
    context.query.address ?? "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
  console.log("address", address);

  const mock_data = {
    date: "April 20",
    networth: {
      EthCad: 4000,
      active: "day",
      value: "1337,69 $ CAD",
      change: "420.69 $ total",
    },
  };

  const summary_props_mock = {
    collection_name: "Bored Ape Yacht Club",
    collection_logo: "./images/bayc-logo.png",
    collection_ticker: "BAYC",
    floor_price_live: 80.69,
    floor_price_delta: 2.4,
    floor_price_timestamp: "Friday",
  };

  const BAYC: collection = {
    id: "1",
    logo: "./images/BAYC.png",
    ticker: "BAYC",
    name: "Bored Ape Yacht Club",
    address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    timestamp: "firday",
    floor_price: 164285 / 3130.43,
    floor_price_delta: 6900 / 3130.43,
    data_price: [],
  };

  const PUNK: collection = {
    id: "2",
    logo: "./images/PUNK.png",
    ticker: "PUNK",
    name: "CryptoPunks",
    timestamp: "firday",
    address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    floor_price: 164285 / 3130.43,
    floor_price_delta: -6900 / 3130.43,
    data_price: [],
  };

  const BAYC2: collection = {
    id: "3",
    logo: "./images/BAYC.png",
    ticker: "BAYC",
    name: "Bored Ape Yacht Club",
    timestamp: "firday",
    address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    floor_price: 164285 / 3130.43,
    floor_price_delta: 6900 / 3130.43,
    data_price: [],
  };

  const PUNK2: collection = {
    id: "4",
    logo: "./images/PUNK.png",
    ticker: "PUNK",
    name: "CryptoPunks",
    timestamp: "firday",
    address: "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d",
    floor_price: 164285 / 3130.43,
    floor_price_delta: -6900 / 3130.43,
    data_price: [],
  };

  const collections_mock = [BAYC, PUNK, BAYC2, PUNK2] as collection[];

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

    for (const collection of collections_mock) {
      collection.data_price = outpout_smoothed;
    }

    return {
      props: {
        summary_props: summary_props_mock,
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
        mock_data: null,
      },
    };
  }
}
