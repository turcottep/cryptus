import React, { useEffect, useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { isMobile as mobile } from "react-device-detect";
import { useRouter } from "next/router";

import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";

export default function post(props) {
  const { collections, user } = props;

  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    setIsMobile(mobile);
    console.log("isMobile", isMobile);
  }, [mobile]);

  return (
    // <AnimatedDiv>
    <Profile collections={collections} user={user} isMobile={isMobile} />
    // </AnimatedDiv>
  );
}

export async function getServerSideProps(context) {
  const { userId: userName } = context.query;
  const returningProps = get_profile_props(userName);
  return returningProps;
}
