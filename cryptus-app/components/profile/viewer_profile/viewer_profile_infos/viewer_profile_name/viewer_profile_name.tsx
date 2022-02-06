import React, { useState, useEffect } from "react";
import Checkmarks from "./checkmarks/checkmarks";
import s from "./viewer_profile_name.module.scss";


export default function ViewerProfileName(props) {
  return (
    <div className={s.container}>
      <div>{props.user.displayName}</div>
      <Checkmarks/>
    </div>
  );
}