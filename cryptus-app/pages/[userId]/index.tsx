import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";
import { profile_props } from "../../lib/data_types";

export default function ProfilePage() {
  const props_empty: profile_props = {
    collections: [
      {
        id: 0,
        address: "",
        name: "",
        description: "",
        image_url: "",
        external_url: "",
        market_cap: 0,
        nfts: [
          {
            name: "",
            image_url: "",
            description: "",
            collection: "",
            collection_size: null,
            collection_address: "",
            token_id: "",
            external_url: "",
            last_sale_price: 0,
            last_sale_symbol: "ETH",
            rarity_rank: null,
            properties: null,
          },
        ],
      },
    ],
    user: {
      username: "",
      description: "",
      networth: 0,
      address: "",
      collections_filter: [],
    },
  };
  const router = useRouter();
  const { userId: userName } = router.query;
  const userNameString = userName as string;

  const [isMobile, setIsMobile] = useState(true);
  const [loading, setLoading] = useState<Boolean>(false);
  const [profile_props, set_profile_props] =
    useState<profile_props>(props_empty);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  useEffect(() => {
    setLoading(true);
    const getProps = async () => {
      console.log("getting props for ", userNameString);
      const returningProps = await get_profile_props(userNameString);
      console.log("returning", returningProps);
      set_profile_props(returningProps.props);
      setLoading(false);
    };

    if (userNameString) {
      getProps();
    }
  }, [userName]);

  return (
    <AnimatedDiv>
      <Profile
        collections={profile_props.collections}
        user={profile_props.user}
        isMobile={isMobile}
      />
    </AnimatedDiv>
  );
}
