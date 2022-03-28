import React, { useState, useEffect } from "react";
import s from "./profile.module.scss";

import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

import { nft_collection, profile_props, tabs } from "../../lib/data_types";

import Footer from "../footer/footer";
import ProfileWalletViewer from "../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
import CreatorHeader from "./creator_profile/creator_header/creator_header";
import MyProfInfos from "./creator_profile/creator_profile_infos/creator_profile_infos";
import ViewerHeader from "./viewer_profile/viewer_header/viewer_header";
import ViewProfInfos from "./viewer_profile/viewer_profile_infos/viewer_profile_infos";

import DesktopHeader from "../header/desktop_header/desktop_header";

export default function Profile(props: {
  collections: nft_collection[];
  user: any;
  isMobile: boolean;
}) {
  const { collections, user, isMobile } = props;

  const [session, loading] = useSession();
  const [isMyProfile, setIsMyProfile] = useState<Boolean>(false);

  const router = useRouter();
  const { userId } = router.query;

  useEffect(() => {
    const is_my_profile = userId && userId === session?.user?.name;
    setIsMyProfile(is_my_profile);

    console.log("is_my_profile", is_my_profile);
  }, [loading]);

  return (
    <div className={s.container}>
      {isMobile ? null : <DesktopHeader tab="profile" />}
      {isMobile ? isMyProfile ? <CreatorHeader /> : <ViewerHeader /> : null}
      {isMyProfile ? <MyProfInfos {...props} /> : <ViewProfInfos {...props} />}
      <ProfileWalletViewer collections={collections} />
      {isMobile ? <Footer /> : null}
    </div>
  );
}
