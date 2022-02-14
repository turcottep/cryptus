import React from "react";
import Graph from "../../components/graph/graph";
import FeatureIamTesting from "../../components/template/pagetemplate/pagetemplate";
import { data_raw } from "../../lib/data";

export default function Home(props: { sale_prices: number[] }) {
  //internal imports

  // parse data from "0     18462 2022-01-31 15:40:26         3.98           ETH    2549.53  0x63950ef80536bce5b4f0942ada77a5eeef7368ee9842af49ebbc2b6383e2bdde      1643661626" to "tokenid,timestamp_raw,total_price payment_token,usd_price,transaction_hash,timestamp_unix"
  // const data_clean = data_raw.split("\n").map((row) => {
  //   const [
  //     tx_id,
  //     tokenid,
  //     timestamp_day,
  //     timestamp_time,
  //     total_price,
  //     payment_token,
  //     usd_price,
  //     transaction_hash,
  //     timestamp_unix,
  //   ] = row.split(/\s+/);
  //   return {
  //     tx_id,
  //     tokenid,
  //     timestamp_day,
  //     timestamp_time,
  //     total_price,
  //     payment_token,
  //     usd_price,
  //     transaction_hash,
  //     timestamp_unix,
  //   };
  // });

  // const all_prices = data_clean.map((row) => {
  //   return parseFloat(row.total_price);
  // });

  const { sale_prices } = props;

  const mock_volume = sale_prices.map((row) => {
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
        <Graph
          data_price={sale_prices}
          data_volume={mock_volume}
          detailled={true}
        />
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const address = context.query.address;
  console.log("address", address);

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

    return { props: { sale_prices: outpout_smoothed } };
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("DEEZ");

    return {
      props: { sale_prices: null },
    };
  }
}
