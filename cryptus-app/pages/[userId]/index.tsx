import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/viewer/Mosaic";
import NavbarProfile from "../../components/navbars/navbar_profile/navbar_profile";
import Profile from "../../components/profile/profile";
import getUserByUsername from "../../lib/getUserByUsername";
import update_nfts_for_user from "../../lib/update_nfts_for_user";
import get_nfts_for_user from "../../lib/get_nfts_for_user";

export default function post(props) {
  const router = useRouter();
  const { userId } = router.query;
  const username = userId

  return (
    <Profile {...props} />
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
    let nfts = await update_nfts_for_user(username, user.wallets[0].address, user.userId);
    if (!nfts) {
      nfts =
        await get_nfts_for_user(username);
    }
    nfts.sort((a, b) => {
      return b.collection - a.collection;
    });
    // console.log("nfts===", nfts);
    return {
      props: { assets: nfts, user },
    };


  } catch (err) {
    console.error(err);
    console.error(err);
    console.log("respons = ", res);
    console.log("DEEZ");

    return {
      props: { assets: null, user: user },
    };
  }
  console.log("no data");
  return null;
}
