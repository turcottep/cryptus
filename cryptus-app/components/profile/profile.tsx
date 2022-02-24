import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./profile.module.scss";

import ViewerProfile from "./viewer_profile/viewer_profile";
import CreatorProfile from "./creator_profile/creator_profile";
import { profile_props } from "../../lib/data_types";
import router from "next/router";

export default function Profile(props: profile_props) {
  const [session, status] = useSession();
  const [is_my_profile, setIsMyProfile] = useState<Boolean>(false);

  useEffect(() => {
    const user_name = router.query.userId;
    console.log("user_name", user_name);
    console.log("session", session);

    const is_my_profile = user_name && user_name === session?.user?.name;
    console.log("is_my_profile", is_my_profile);

    setIsMyProfile(is_my_profile);
  }, [session]);

  return (
    <div className={s.app}>
      {is_my_profile ? (
        <CreatorProfile {...props} />
      ) : (
        <ViewerProfile {...props} />
      )}
    </div>
  );
}
