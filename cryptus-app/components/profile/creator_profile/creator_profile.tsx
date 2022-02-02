import React, { useState, useEffect } from "react";
import s from "./creator_profile.module.scss";

import CreatorProfileInfos from "./creator_profile_infos/creator_profile_infos";
import CreatorHeader from "./creator_header/creator_header";
//import ProfileWalletViewer from "../../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer"
//import Footer from "../../footer/footer"

export default function CreatorProfile() {
  return (
    <div className={s.app}>
      <CreatorHeader />
      <CreatorProfileInfos />
      {/* <ProfileWalletViewer />
      <Footer /> */}
    </div>
  );
}