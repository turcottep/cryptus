import React, { useState, useEffect } from "react";
import s from "./creator_profile.module.scss";

import get_mock_props from "../../../lib/get_mock_props";
import CreatorProfileInfos from "./creator_profile_infos/creator_profile_infos";
import CreatorHeader from "./creator_header/creator_header";
import { nft_collection, profile_props } from "../../../lib/data_types";
import ProfileWalletViewer from "../../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
import Footer from "../../footer/footer";

export default function CreatorProfile(props: {
  collections: nft_collection[];
  user: any;
}) {
  const { collections, user } = props;

  return (
    <div className={s.container}>
      <CreatorHeader />
      <CreatorProfileInfos {...props} />
      <ProfileWalletViewer collections={collections} />
      <Footer />
    </div>
  );
}
