import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";
import { profile_props } from "../../lib/data_types";

export default function post() {
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
  const [prop, setProp] = useState<any | null>(props_empty);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  useEffect(() => {
    setLoading(true);
    async function getProps() {
      const returningProps = await get_profile_props(userNameString);
      console.log("returning", returningProps);
      setProp(returningProps.props);
      setLoading(false);
    }
    if (userNameString) {
      getProps();
    }
  }, [userName]);

  return (
    <AnimatedDiv>
      <Profile
        collections={prop.collections}
        user={prop.user}
        isMobile={isMobile}
      />
    </AnimatedDiv>
  );
}
