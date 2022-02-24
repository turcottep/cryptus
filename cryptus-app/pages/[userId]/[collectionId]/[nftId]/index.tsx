import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import getUserByUsername from "../../../../lib/getUserByUsername";
import update_nfts_for_user from "../../../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../../../lib/sort_nfts_into_collections";
import { profile_props, nft_collection, nft } from "../../../../lib/data_types";

import NFTDetails from "../../../../components/wallet_viewer/nft_details/nft_details";
import getMockProps from "../../../../lib/get_mock_props";
import AnimatedDiv from "../../../../components/utils/animated_div";

export default function post(props: { nft: nft; rank }) {
  const { nft, rank } = props;

  return (
    <AnimatedDiv>
      <NFTDetails nft={nft} rank={rank} />
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
    const mock_props = getMockProps() as profile_props;
    const mock_collections = mock_props.collections;

    const goodcollection = mock_collections.find(
      (coll) =>
        collectionName ==
        coll.name
          .replace(/[^0-9a-z]/gi, " ")
          .replace(/\s/g, "")
          .toLowerCase()
    );

    const goodnft = goodcollection.nfts.find(
      (nft) =>
        nftName ==
        nft.name
          .replace(/[^0-9a-z]/gi, " ")
          .replace(/\s/g, "")
          .toLowerCase()
    );

    const returningProps = {
      props: { nft: goodnft, rank: { position: 100, total: 1000 } },
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
