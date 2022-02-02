import { useRouter } from "next/router";

import React from "react";
import Mosaic from "../../components/viewer/Mosaic";
import NavbarProfile from "../../components/navbars/navbar_profile/navbar_profile";
import Profile from "../../components/profile/profile";
import getUserByUsername from "../../lib/getUserByUsername";

export default function post(props) {
  const router = useRouter();
  const { username } = router.query;

  return (
    <Profile {...props} />
  );
}

export async function getServerSideProps(context) {
  const username = context.query.userId;
  const user = await getUserByUsername(username, true);
  let res;
  try {
    var data;
    for (const wallet of user.wallets) {
      const address = wallet.address;
      //fetch nfts from opensea
      res = await fetch("https://api.opensea.io/api/v1/assets?owner=" + address + "&order_direction=asc&offset=0&limit=50", {
        headers: {
          "Accept": "application/json",
          "X-API-KEY": process.env.OPENSEA_API_KEY,
        },
      });
      // res = await fetch(wallet.external_url);
      data = await res.json();
    }
    if (!data) {
      return {
        props: { assets: [], user: user },
      };
    }
    return {
      props: { assets: data.assets, user: user },
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
