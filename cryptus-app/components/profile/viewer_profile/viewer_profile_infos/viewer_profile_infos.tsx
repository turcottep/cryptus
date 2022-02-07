import React, { useState, useEffect } from "react";
import s from "./viewer_profile_infos.module.scss";

import ViewerProfilePicture from "./viewer_profile_picture/viewer_profile_picture";
import ViewerProfileName from "./viewer_profile_name/viewer_profile_name";
import ViewerProfileDescription from "./viewer_profile_description/viewer_profile_description";
import { profile_props } from "../../../../lib/data_types";

export default function ViewerProfileInfos(props: profile_props) {
  return (
    <div className={s.container}>
      <ViewerProfilePicture />
      <ViewerProfileName displayName={props.user.displayName} />
      <ViewerProfileDescription description={props.user.description} />
    </div>
  );
}
