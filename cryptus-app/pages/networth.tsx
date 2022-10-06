import React, { useState, useEffect } from "react";
import FeatureIamTesting from "../components/utils/template/pagetemplate/pagetemplate";
import NFTDetails from "../components/profile/wallet_viewer/nft_details/nft_details";
import { nft, profile_props } from "../lib/data_types";
import get_mock_props from "../lib/get_mock_props";
import GetCollectionTokens from "../lib/get_collection_token";

export default function NetworthPage() {
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

      <main>NETWORTH</main>
    </div>
  );
}
