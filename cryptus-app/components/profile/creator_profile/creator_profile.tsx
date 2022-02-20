import React, { useState, useEffect } from "react";
import s from "./creator_profile.module.scss";

import CreatorProfileInfos from "./creator_profile_infos/creator_profile_infos";
import CreatorHeader from "./creator_header/creator_header";
import { profile_props } from "../../../lib/data_types";
import ProfileWalletViewer from "../../wallet_viewer/profile_wallet_viewer/profile_wallet_viewer";
//import Footer from "../../footer/footer"

export default function CreatorProfile(props: profile_props) {
  return (
    <div className={s.container}>
      <CreatorHeader />
      <CreatorProfileInfos {...props} />
      <ProfileWalletViewer collections={props.collections} />
      {/* <Footer /> */}
      <div className={s.footer}>FOOTER</div>
    </div>
  );
}
