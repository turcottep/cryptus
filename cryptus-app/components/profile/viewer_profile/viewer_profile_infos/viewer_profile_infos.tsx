import React, { useState, useEffect } from "react";
import s from "./viewer_profile_infos.module.scss";

import { profile_props } from "../../../../lib/data_types";

export default function ViewerProfileInfos(props: {
  user: profile_props;
  image_url: string;
}) {
  const { username, description, networth } = props.user.user;

  return (
    <div className={s.container}>
      <div className={s.left}></div>
      <div className={s.center}>
        <div className={s.profilepicture_container}>
          <img className={s.profilePic} src={props.image_url} alt="Avatar" />
        </div>
        <div className={s.username}>{username.toUpperCase()}</div>
        <div className={s.description}>{description}</div>
      </div>
      <div className={s.right}></div>
    </div>
  );
}
