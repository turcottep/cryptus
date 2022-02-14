import React from "react";
import Graph from "../../components/graph/graph";
import FeatureIamTesting from "../../components/template/pagetemplate/pagetemplate";
import { data_raw } from "../../lib/data";

export default function Home(props: { sale_prices: number[] }) {
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

      <main className="h-40 w-full mx-auto">
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
  const address = "0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d";
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
