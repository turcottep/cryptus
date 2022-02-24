import React, { useState, useEffect } from "react";
import s from "./viewer_profile.module.scss";

import { useRouter } from "next/router";

import get_mock_props from "../../../lib/get_mock_props";
import { profile_props } from "../../../lib/data_types";

import ViewerHeader from "./viewer_header/viewer_header";
import ViewerProfileInfos from "./viewer_profile_infos/viewer_profile_infos";
import ProfileWalletViewer from "../../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
import Footer from "../../footer/footer";

//import Footer from "../../footer/footer"

export default function ViewerProfile(props: profile_props) {
  const router = useRouter();
  const { userId } = router.query;

  const mock_props = get_mock_props() as profile_props;
  const mock_collection = mock_props.collections;

  return (
    <div className={s.container}>
      <ViewerHeader />
      <ViewerProfileInfos {...props} />
      <ProfileWalletViewer collections={mock_collection} />
      <Footer />
    </div>
  );
}
