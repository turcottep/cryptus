import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import getUserByUsername from "../../../../lib/getUserByUsername";
import update_nfts_for_user from "../../../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../../../lib/sort_nfts_into_collections";
import { profile_props, nft_collection, nft } from "../../../../lib/data_types";
import getCollectionToken from "../../../../lib/get_collection_token";
import getNFTListedPrice from "../../../../lib/get_nft_listed_price";

import NFTDetails from "../../../../components/wallet_viewer/nft_details/nft_details";
import getMockProps from "../../../../lib/get_mock_props";
import AnimatedDiv from "../../../../components/utils/animated_div";
import get_profile_props from "../../../../lib/get_profile_props";
import { get_clean_name } from "../../../../lib/get_name_without_spaces";

export default function post(props: { nft: nft; rank; listed_price }) {
  const { nft, rank, listed_price } = props;

  return (
    <AnimatedDiv>
      <NFTDetails nft={nft} rank={rank} listed_price={listed_price} />
    </AnimatedDiv>
  );
}

export async function getServerSideProps(context) {
  const {
    userId: userName,
    collectionId: collectionName,
    nftId: nftName,
  } = context.query;
  //   const user = await getUserByUsername(userName, true);
  //   if (!user) {
  //     return {
  //       props: {
  //         assets: [],
  //         user: null,
  //       },
  //     };
  //   }
  //   let res;
  //   try {
  //     let nfts = await update_nfts_for_user(
  //       userName,
  //       user.wallets[0].address,
  //       user.userId
  //     );
  //     if (!nfts) {
  //       nfts = await get_nfts_for_user(userName);
  //     }
  //     const nfts_collections = sortNftsIntoCollections(nfts);

  //     const goodcollection = nfts_collections.find(
  //       (coll) =>
  //         collectionName ==
  //         coll.name
  //           .replace(/[^0-9a-z]/gi, " ")
  //           .replace(/\s/g, "")
  //           .toLowerCase()
  //     );

  //     const goodnft = goodcollection.nfts.find(
  //       (nft) =>
  //         nftName ==
  //         nft.name
  //           .replace(/[^0-9a-z]/gi, " ")
  //           .replace(/\s/g, "")
  //           .toLowerCase()
  //     );

  //     const returningProps = {
  //       props: { nft: goodnft, rank: { position: 100, total: 1000 } },
  //     };
  try {
    const { userId: userName, collectionId: collectionName } = context.query;
    const profile_props = await get_profile_props(userName);

    const goodcollection = profile_props.props.collections.find(
      (coll) => collectionName == get_clean_name(coll.name)
    );

    const goodnft = goodcollection.nfts.find(
      (nft) => nftName == get_clean_name(nft.name)
    );

    const collectionSize: number = await getCollectionToken(
      goodnft.collection_address
    );

    // Rarity rank is calculated from it's traits and rounded the result. The equation is :sum(1/(nb_with_trait/total_count))
    const sorted_traits = goodnft.properties.sort((a, b) => {
      return a.count - b.count;
    });
    const rarity = Math.round(
      sorted_traits
        .map((trait) => {
          trait.rarity = trait.count / collectionSize;
          return 1 / trait.rarity;
        })
        .reduce((partialSum, a) => partialSum + a, 0)
    );

    const listed_price_temp = await getNFTListedPrice(
      goodnft.collection_address,
      goodnft.token_id
    );

    const returningProps = {
      props: {
        nft: goodnft,
        rank: { position: rarity, total: collectionSize },
        listed_price: listed_price_temp,
      },
    };

    return returningProps;
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", err);
    console.log("DEEZ");

    return {
      props: { assets: null },
    };
  }
}
