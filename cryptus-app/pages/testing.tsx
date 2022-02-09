import React from "react";
import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
import NFTDetails from "../components/wallet_viewer/nft_details/nft_details";
import { nft, profile_props } from "../lib/data_types";
import get_mock_props from "../lib/get_mock_props";

export default function Home() {
  const mock_props = get_mock_props() as profile_props;
  const mock_nft = mock_props.collections[0].nfts[0];

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
        <NFTDetails
          nft={mock_nft}
          rank_props={{ position: 1677, total: 10000 }}
        />
      </main>
    </div>
  );
}
