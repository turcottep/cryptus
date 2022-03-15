import React from "react";
import Profile from "../../components/profile/profile";
import AnimatedDiv from "../../components/utils/animated_div";

import get_profile_props from "../../lib/get_profile_props";

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
  const returningProps = get_profile_props(userName);
  return returningProps;
}
