import React from "react";
import FeatureIamTesting from "../components/template/pagetemplate/pagetemplate";
// Import market_overwiew parent component to test here
import NFTDetails from "../components/wallet_viewer/nft_details/nft_details";
import { nft } from "../lib/data_types";

export default function Home() {
  const mock_nft = {
    id: 123,
    collection: "Bored Ape Yacht Club",
    name: "BAYC #123",
    description: "BAYC #123",
    external_url:
      "https://opensea.io/assets/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d/123",
    image_url:
      "https://lh3.googleusercontent.com/ghH08YcdEkukd04RDrn3zAPyFAYpkUSnSoNBZjaeP-LTx6r_v9i6vDaJlbj9a2pbhfPcIi0bOOXIdoFmzrGr9aQcYS6X4XNxFWVJqw=s0",
    properties:
      '[{ "name": "Background", "value": "New Punk Blue", "rarity": 0.1232 }, { "name": "Clothes", "value": "Black Holes T", "rarity": 0.0205 }, { "name": "Eyes", "value": "Coins", "rarity": 0.0479 }, { "name": "Hat", "value": "Spinner Hat", "rarity": 0.0181 }, { "name": "Fur", "value": "White", "rarity": 0.0397 }, { "name": "Mouth", "value": "Bored Cigar", "rarity": 0.0121 }]',
    last_sale_price: 0,
    last_sale_symbol: "ETH",
  } as nft;

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
