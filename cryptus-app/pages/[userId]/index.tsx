import { useRouter } from "next/router";

import React from "react";
import fs from "fs";
import Mosaic from "../../components/viewer/Mosaic";
import NavbarProfile from "../../components/navbars/navbar_profile/navbar_profile";
import Profile from "../../components/profile/profile";
import getUserByUsername from "../../lib/getUserByUsername";
import update_nfts_for_user from "../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../lib/get_nfts_for_user";
import sortNftsIntoCollections from "../../lib/sort_nfts_into_collections";
import { profile_props } from "../../lib/data_types";

import Profile_wallet_viewer from "../../components/wallet_viewer/profile_wallet_viewer/profile_wallet_viewer"
import { nft } from "../../lib/data_types"

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const username = userId;

  return <Profile {...props} />;
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
    const file = `${process.cwd()}/public/${username}.json`;
    fs.writeFileSync(file, JSON.stringify(returningProps));

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
