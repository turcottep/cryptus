import React, { useState, useEffect } from "react";
import s from "./viewer_profile_name.module.scss";


export default function ViewerProfileName(props) {
  return (
    <div className={s.container}>
      {props.user.displayName}
    </div>
  );
}