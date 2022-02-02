import React, { useState, useEffect } from "react";
import s from "./viewer_profile.module.scss";

import ViewerProfilePicture from "./viewer_profile_picture/viewer_profile_picture";
import ViewerProfileName from "./viewer_profile_name/viewer_profile_name";
import ViewerProfileDescription from "./viewer_profile_description/viewer_profile_description";

export default function ViewerProfileInfos(props) {
  return (
    <div className={s.container}>
      <ViewerProfilePicture {...props} />
      <ViewerProfileName {...props} />
      <ViewerProfileDescription {...props} />
    </div>
  );
}