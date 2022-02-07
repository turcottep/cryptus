import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./profile.module.scss";

import ViewerProfile from "./viewer_profile/viewer_profile";
import CreatorProfile from "./creator_profile/creator_profile";
import { profile_props } from "../../lib/data_types";

export default function Profile(props: profile_props) {
  const [session] = useSession();
  return (
    <div className={s.app}>
      {session ? <CreatorProfile {...props} /> : <ViewerProfile {...props} />}
    </div>
  );
}
