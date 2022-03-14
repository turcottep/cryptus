import React from "react";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import Profile from "../../components/profile/profile";

import getUserByUsername from "../../lib/getUserByUsername";
import update_nfts_for_user from "../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../lib/sort_nfts_into_collections";
import { profile_props } from "../../lib/data_types";
import AnimatedDiv from "../../components/utils/animated_div";
import getMockProps from "../../lib/get_mock_props";

export default function post(props) {
  const { collections, user } = props;
  return (
    <AnimatedDiv>
      <Profile collections={collections} user={user} />
    </AnimatedDiv>
  );
}

export async function getServerSideProps(context) {
  const { userId: userName } = context.query;
  const mock_props = getMockProps() as profile_props;
  const mock_collections = mock_props.collections;

  const user = await getUserByUsername(userName, true);
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
  try {
    const returningProps = {
      props: { collections: mock_collections, user: user } as profile_props,
    };

    return returningProps;
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", err);
    console.log("DEEZ");

    return {
      props: { assets: null, user: userName },
    };
  }
}
