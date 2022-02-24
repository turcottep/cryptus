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

export async function getServerSideProps() {
  const address = "0x1a92f7381b9f03921564a437210bb9396471050c";
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
    collection_logo: "/images/bayc-logo.png",
    collection_ticker: "BAYC",
    floor_price_live: 80.69,
    floor_price_delta: 2.4,
    floor_price_timestamp: "Friday",
  };

  // const BAYC: collection = {
  //   id: "1",
  //   logo: "/images/BAYC.png",
  //   ticker: "BAYC",
  //   name: "Bored Ape Yacht Club",
  //   address: address,
  //   timestamp: "firday",
  //   floor_price: 164285 / 3130.43,
  //   floor_price_delta: 6900 / 3130.43,
  //   data_price: [],
  //   data_volume: [],
  // };

  const coolcatsnft: collection = {
    id: "2",
    logo: "/images/coolcatsnft.png",
    ticker: "CATS",
    name: "Cool Cats NFT",
    timestamp: "firday",
    address: "0x1a92f7381b9f03921564a437210bb9396471050c",
    floor_price: 7.79,
    floor_price_delta: 0.01,
    data_price: [],
    data_volume: [],
  };

  const mutantapeyachtclub: collection = {
    id: "3",
    logo: "/images/mutant-ape-yacht-club.png",
    ticker: "MAYC",
    name: "Mutant Ape Yacht Club",
    timestamp: "firday",
    address: "0x60e4d786628fea6478f785a6d7e704777c86a7c6",
    floor_price: 15.69,
    floor_price_delta: -0.75,
    data_price: [],
    data_volume: [],
  };

  const meebits: collection = {
    id: "4",
    logo: "/images/meebits.png",
    ticker: "MEE",
    name: "Meebits",
    timestamp: "firday",
    address: "0x7bd29408f11d2bfc23c34f18275bbf23bb716bc7",
    floor_price: 2.65,
    floor_price_delta: -0.35,
    data_price: [],
    data_volume: [],
  };

  const doodles: collection = {
    id: "5",
    logo: "/images/doodles.jpg",
    ticker: "DOOD",
    name: "Doodles",
    timestamp: "firday",
    address: "0x8a90cab2b38dba80c64b7734e58ee1db38b8992e",
    floor_price: 9.99,
    floor_price_delta: -1.25,
    data_price: [],
    data_volume: [],
  };

  const cryptoadz: collection = {
    id: "6",
    logo: "/images/toadz.gif",
    ticker: "TOADz",
    name: "CrypToadz by GREMPLIN",
    timestamp: "firday",
    address: "0x1cb1a5e65610aeff2551a50f76a87a7d3fb649c6",
    floor_price: 9.99,
    floor_price_delta: -1.25,
    data_price: [],
    data_volume: [],
  };

  const pudgypenguins: collection = {
    id: "7",
    logo: "/images/pudgypenguins.jpg",
    ticker: "PUDGY",
    name: "Pudgy Penguins",
    timestamp: "firday",
    address: "0xbd3531da5cf5857e7cfaa92426877b022e612cf8",
    floor_price: 0.89,
    floor_price_delta: -0.25,
    data_price: [],
    data_volume: [],
  };

  const veefriends: collection = {
    id: "8",
    logo: "/images/veefriends.png",
    ticker: "VEE",
    name: "VeeFriends",
    timestamp: "firday",
    address: "0xa3aee8bce55beea1951ef834b99f3ac60d1abeeb",
    floor_price: 12.5,
    floor_price_delta: -1.55,
    data_price: [],
    data_volume: [],
  };

  const flufworld: collection = {
    id: "9",
    logo: "/images/FLUF.png",
    ticker: "FLUF",
    name: "FLUF World",
    timestamp: "firday",
    address: "0xccc441ac31f02cd96c153db6fd5fe0a2f4e6a68d",
    floor_price: 3.425,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  };

  const guttercatgang: collection = {
    id: "10",
    logo: "/images/GCG.gif",
    ticker: "GCG",
    name: "Gutter Cat Gang",
    timestamp: "firday",
    address: "0xedb61f74b0d09b2558f1eeb79b247c1f363ae452",
    floor_price: 3.425,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  };

  const alienfrens: collection = {
    id: "11",
    logo: "/images/AF.png",
    ticker: "AF",
    name: "alien frens",
    timestamp: "firday",
    address: "0x123b30e25973fecd8354dd5f41cc45a3065ef88c",
    floor_price: 1.49,
    floor_price_delta: -0.49,
    data_price: [],
    data_volume: [],
  };

  const collections_mock = [
    // BAYC,
    coolcatsnft,
    mutantapeyachtclub,
    meebits,
    doodles,
    cryptoadz,
    pudgypenguins,
    veefriends,
    flufworld,
    guttercatgang,
    alienfrens,
  ] as collection[];

  try {
    const viewingmode = "week";
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
    collections_mock.forEach((collection) => {
      collection.data_price = price;
    });
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
