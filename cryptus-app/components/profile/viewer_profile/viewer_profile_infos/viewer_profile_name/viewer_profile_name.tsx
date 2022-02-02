import React, { useState, useEffect } from "react";
import s from "./viewer_profile_name.module.scss";


export default function ViewerProfileName(props:{username:String}) {
  return (
    <div className={s.container}>
      {props.username}
    </div>
  );
}