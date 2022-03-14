import React, { useState, useEffect } from "react";
import s from "./creator_profile_infos.module.scss";

import ViewerProfilePicture from "../../viewer_profile/viewer_profile_infos/viewer_profile_picture/viewer_profile_picture";
import EditNftsButton from "./edit_nfts_button/edit_nfts_button";
import EditProfileButton from "./edit_profile_button/edit_profile_button";
import ViewerProfileName from "../../viewer_profile/viewer_profile_infos/viewer_profile_name/viewer_profile_name";
import ViewerProfileDescription from "../../viewer_profile/viewer_profile_infos/viewer_profile_description/viewer_profile_description";
import { profile_props } from "../../../../lib/data_types";

export default function CreatorProfileInfos(props: profile_props) {
  const { description, username, networth } = props.user;
  console.log("props", props);
  return (
    <div className={s.container}>
      <div className={s.row}>
        <ViewerProfilePicture />
        <div className={s.edits}>
          <EditProfileButton />
        </div>
      </div>
      <ViewerProfileName displayName={username} />
      <ViewerProfileDescription description={description} />
      <div>{`NETWORTH:${networth}`}</div>
    </div>
  );
}
