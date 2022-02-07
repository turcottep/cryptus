import React, { useState, useEffect } from "react";
import Checkmarks from "./checkmarks/checkmarks";
import s from "./viewer_profile_name.module.scss";


export default function ViewerProfileName(props: {displayName: String}) {
  return (
    <div className={s.container}>
      <div>
        {props.displayName}
      </div>
      <Checkmarks/>
    </div>
  );
}