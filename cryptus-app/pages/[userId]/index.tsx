import React from "react";
import { useRouter } from "next/router";

import { motion, AnimatePresence } from "framer-motion";

import Profile from "../../components/profile/profile";

import getUserByUsername from "../../lib/getUserByUsername";
import update_nfts_for_user from "../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../lib/sort_nfts_into_collections";
import { profile_props } from "../../lib/data_types";

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const username = userId;

  return (
    <AnimatePresence>
      <motion.div
        key="modal"
        initial={{ x: "-100vw", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
        exit={{ opacity: 0 }}
      >
        <Profile {...props} />
      </motion.div>
    </AnimatePresence>
  );
}

export async function getServerSideProps(context) {
  const username = context.query.userId;
  const user = await getUserByUsername(username, true);
  if (!user) {
    return {
      props: {
        assets: [],
        user: null,
      },
    };
  }
  let res;
  try {
    let nfts = await update_nfts_for_user(
      username,
      user.wallets[0].address,
      user.userId
    );
    if (!nfts) {
      nfts = await get_nfts_for_user(username);
    }
    const nfts_collections = sortNftsIntoCollections(nfts);
    // console.log("nfts===", nfts);
    const returningProps = {
      props: { collections: nfts_collections, user } as profile_props,
    };

    // //save to file sync
    // const file = `${process.cwd()}/public/${username}.json`;
    // fs.writeFileSync(file, JSON.stringify(returningProps));

    return returningProps;
  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", res);
    console.log("DEEZ");

    return {
      props: { assets: null, user: user },
    };
  }
}
