import React from "react";
import ShowCollections from "../components/wallet_viewer/show_collections/show_collections";
import { nft, nft_collection } from "../lib/data_types";
import { mock_wallet } from "../lib/mocks";

export default function ShowCollectionsPage({ data }) {
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
        <ShowCollections collections={mock_wallet} />
      </main>
    </div>
  );
}
