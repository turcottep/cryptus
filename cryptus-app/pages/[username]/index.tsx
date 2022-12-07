import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";
import { profile_props } from "../../lib/data_types";
import get_empty_profile_props from "../../lib/empty_profile_props";
import useWindowSize from "../../components/utils/use_window_size";
import Loading from "../../components/utils/loading/loading";
import Head from "next/head";

export default function ProfilePage() {
  const props_empty = get_empty_profile_props();
  const router = useRouter();
  const { username } = router.query;
  const userNameString = username as string;

  const [isMobile, setIsMobile] = useState(true);
  const [loading, setLoading] = useState<Boolean>(false);
  const [old_username, setOldUsername] = useState<string>("");

  const [user_props, set_user_props] = useState(props_empty.user);
  const [collections_props, set_collections_props] = useState(
    props_empty.collections
  );

  console.log("reloading all...");

  let size = useWindowSize();
  let nbColToFillPage =
    Math.ceil(size.width / 170) * Math.ceil((size.height - 300) / 190);
  // console.log("nombre collections to fill page", nbColToFillPage);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  useEffect(() => {
    console.log(
      "username changed new:",
      username,
      "old_username",
      old_username
    );
    if (username !== old_username) {
      console.log("username changed for real");

      const userNameString = username as string;
      set_collections_props(props_empty.collections);
      set_user_props(props_empty.user);
      // setLoading(true);
      // setOldUsername(userNameString);
    }
  }, [username]);

  useEffect(() => {
    setLoading(true);
    const getProps = async () => {
      try {
        console.log("getting props for ", userNameString);
        const returningProps = await get_profile_props(
          userNameString,
          nbColToFillPage
        );
        console.log("returning", returningProps);
        // set_profile_props(returningProps.props);
        const new_user_props = returningProps.props.user;
        const new_collections_props = returningProps.props.collections;
        set_user_props(new_user_props);
        set_collections_props(new_collections_props);

        setLoading(false);
      } catch (e) {
        console.log("error", e);
        setLoading(false);
        set_user_props({
          username: "user not found",
          address: "error",
          profile_image_url: "error",
          collections_filter: ["error"],
          collections_list: [],
          collections_address_list: [],
        });
        set_collections_props([]);
      }
    };

    if (userNameString) {
      getProps();
    }
  }, [username]);

  return (
    // <AnimatedDiv>
    <main>
      <Head>
        <title>{userNameString}</title>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable='yes', maximum-scale=5.0"
        />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="description"
          content="Esiest way to track your NFTs. 
          The new way to check up on your networth in a matter of seconds. 
          Share your holdings with the ones who matter the most."
        />
        <meta
          name="keywords"
          content="NFT Market Overview
          ETH
          ECR-
          Eutereum wallet
          NFT Market Price
          NFT Market tracker
          NFT wallet viewer
          metamask
          Show NFT
          app for nft
          check my nft
          PublicWallet 
          public wallet
          NFT Viewer
          NFT wallet
          Blockchain wallet
          profile links
          NFT links
          NFT marketplace
          
          metamask public address
          public wallet address
          public crypto wallet
          gary vee public wallet
          wallet public key
          crypto wallet public address
          public wallet address metamask
          "
        />
        <meta name="author" content="CryptUS!" />
        <meta name="theme-color" content="#FFFDF5" />

        <link rel="apple-touch-icon" href="/apple-icon.png"></link>
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="manifest" href="/manifest.json" />
        <link
          href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,700"
          rel="stylesheet"
        />
      </Head>
      <Profile
        collections={collections_props}
        user={user_props}
        isMobile={isMobile}
        key={loading ? 1 : 0}
      />
    </main>

    // {/* </AnimatedDiv> */}
  );
}
