import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import s from "./profile.module.scss";

import ViewerProfile from "./viewer_profile/viewer_profile";
import CreatorProfile from "./creator_profile/creator_profile";
import { nft_collection, profile_props } from "../../lib/data_types";
import { useRouter } from "next/router";

export default function Profile(props: {
  collections: nft_collection[];
  user: any;
}) {
  const { collections, user } = props;

  const [session, status] = useSession();
  const [is_my_profile, setIsMyProfile] = useState<Boolean>(false);

  const router = useRouter();
  const { userId: userName } = router.query;

  useEffect(() => {
    const is_my_profile = userName && userName === session?.user?.name;
    setIsMyProfile(is_my_profile);

    console.log("is_my_profile", is_my_profile);
  }, [session]);

  return (
    <div className={s.app}>
      {is_my_profile ? (
        <CreatorProfile collections={collections} user={user} />
      ) : (
        <ViewerProfile collections={collections} user={user} />
      )}
    </div>
  );
}
