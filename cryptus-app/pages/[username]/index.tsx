import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";
import { profile_props } from "../../lib/data_types";
import get_empty_profile_props from "../../lib/empty_profile_props";

export default function ProfilePage() {
  const props_empty = get_empty_profile_props();
  const router = useRouter();
  const { username } = router.query;
  const userNameString = username as string;

  const [isMobile, setIsMobile] = useState(true);
  const [loading, setLoading] = useState<Boolean>(false);

  const [user_props, set_user_props] = useState(props_empty.user);
  const [collections_props, set_collections_props] = useState(
    props_empty.collections
  );

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  useEffect(() => {
    setLoading(true);
    const getProps = async () => {
      console.log("getting props for ", userNameString);
      const returningProps = await get_profile_props(userNameString);
      // console.log("returning", returningProps);
      // set_profile_props(returningProps.props);
      const new_user_props = returningProps.props.user;
      const new_collections_props = returningProps.props.collections;
      set_user_props(new_user_props);
      set_collections_props(new_collections_props);

      setLoading(false);
    };

    if (userNameString) {
      getProps();
    }
  }, [username]);

  return (
    // <AnimatedDiv>
    <Profile
      collections={collections_props}
      user={user_props}
      isMobile={isMobile}
      key={loading ? 1 : 0}
    />
    // {/* </AnimatedDiv> */}
  );
}
