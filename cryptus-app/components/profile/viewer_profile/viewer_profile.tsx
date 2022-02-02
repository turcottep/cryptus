import React, { useState, useEffect } from "react";
import s from "./viewer_profile.module.scss";

import ViewerProfileInfos from "./viewer_profile_infos/viewer_profile_infos";
import ViewerHeader from "./viewer_header/viewer_header";
//import ProfileWalletViewer from "../../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer"
//import Footer from "../../footer/footer"

export default function ViewerProfile(props) {
  return (
    <div className={s.app}>
      <ViewerHeader />
      <ViewerProfileInfos {...props} />
      {/* <ProfileWalletViewer />
      <Footer /> */}
    </div>
  );
}