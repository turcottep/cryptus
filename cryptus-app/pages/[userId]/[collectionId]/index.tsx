import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import getUserByUsername from "../../../lib/getUserByUsername";
import update_nfts_for_user from "../../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../../lib/sort_nfts_into_collections";
import { nft_collection, profile_props } from "../../../lib/data_types";

import CollectionDetails from "../../../components/wallet_viewer/collection_details/collection_details";
import { collection } from "../../../components/market_viewer/market_viewer";
import getMockProps from "../../../lib/get_mock_props";
import AnimatedDiv from "../../../components/utils/animated_div";

export default function post(props: { user; collection: collection }) {
  const { collection, user } = props;
  AnimatedDiv;
  return (
    <AnimatedDiv>
      <CollectionDetails collection={collection} />
    </AnimatedDiv>
  );
}

export async function getServerSideProps(context) {
  const { userId: userName, collectionId: collectionName } = context.query;
  const mock_props = getMockProps() as profile_props;
  const mock_collections = mock_props.collections;

  // const user = await getUserByUsername(userName, true);
  // if (!user) {
  //   return {
  //     props: {
  //       assets: [],
  //       user: null,
  //     },
  //   };
  // }
  // let res;
  // try {
  //   let nfts = await update_nfts_for_user(
  //     userName,
  //     user.wallets[0].address,
  //     user.userId
  //   );
  //   if (!nfts) {
  //     nfts = await get_nfts_for_user(userName);
  //   }
  //   const nfts_collections = sortNftsIntoCollections(nfts);
  //   // console.log("nfts===", nfts);
  //   const returningProps = {
  //     props: { collections: nfts_collections, user } as profile_props,
  //   };
  try {
    const goodcollection = mock_collections.find(
      (coll) =>
        collectionName ==
        coll.name
          .replace(/[^0-9a-z]/gi, " ")
          .replace(/\s/g, "")
          .toLowerCase()
    );

    const returningProps = {
      props: { user: userName, collection: goodcollection },
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
