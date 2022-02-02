import React, { useState, useEffect } from "react";
import s from "./creator_profile_infos.module.scss";

import CreatorProfilePicture from "./creator_profile_picture/creator_profile_picture";
import EditNftsButton from "./edit_nfts_button/edit_nfts_button";
import EditProfileButton from "./edit_profile_button/edit_profile_button";
import CreatorProfileName from "./creator_profile_name/creator_profile_name";
import CreatorProfileDescription from "./creator_profile_description/creator_profile_description";

export default function CreatorProfileInfos() {
  return (
    <div className={s.app}>
      <CreatorProfilePicture />
      <EditNftsButton />
      <EditProfileButton />
      <CreatorProfileName />
      <CreatorProfileDescription />
    </div>
  );
}