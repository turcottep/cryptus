import React, { useState, useEffect } from "react";
import FeatureIamTesting from "../components/utils/template/pagetemplate/pagetemplate";
import NFTDetails from "../components/profile/wallet_viewer/nft_details/nft_details";
import { nft, profile_props } from "../lib/data_types";
import get_mock_props from "../lib/get_mock_props";
import GetCollectionTokens from "../lib/get_collection_token";

export default function Home() {
  const mock_props = get_mock_props() as profile_props;
  const mock_nft = mock_props.collections[0].nfts[0];

  let [collection_size, setCollection_size] = useState(Number);
  let [rarity_rank, setraRity_rank] = useState(Number);

  useEffect(() => {
    const collectionCall = async () => {
      try {
        const collectionSize: number = await GetCollectionTokens(
          mock_nft.collection_address,
          mock_nft.token_id
        );
        setCollection_size(collectionSize);
        // Rarity rank is calculated from it's traits and rounded the result. The equation is :sum(1/(nb_with_trait/total_count))
        const rarity = Math.round(
          mock_nft.properties
            .map((trait) => {
              return 1 / (trait.count / collectionSize);
            })
            .reduce((partialSum, a) => partialSum + a, 0)
        );
        setraRity_rank(rarity);

        console.log("rarity : ", rarity);
        console.log("collection_size : ", collectionSize);
      } catch (error) {
        console.log(error);
      }
    };
    collectionCall();
  }, []);

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

      <main></main>
    </div>
  );
}
