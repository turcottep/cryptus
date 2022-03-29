import React, { useState, useEffect } from "react";
import s from "./viewer_profile_infos.module.scss";

import ViewerProfilePicture from "./viewer_profile_picture/viewer_profile_picture";
import { profile_props } from "../../../../lib/data_types";

export default function ViewerProfileInfos(props: profile_props) {
  console.log("ViewerProfileInfos", props);

  const { username, description, networth } = props.user;

  return (
    <div className={s.container}>
      <ViewerProfilePicture />
      <div>{username}</div>
      <div>{description}</div>
      <div>{`NETWORTH:${networth} eth`}</div>
    </div>
  );
}
