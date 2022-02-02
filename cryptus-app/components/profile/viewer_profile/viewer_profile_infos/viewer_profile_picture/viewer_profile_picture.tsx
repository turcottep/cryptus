import { props } from "cypress/types/bluebird";
import React, { useState, useEffect } from "react";
import s from "./viewer_profile_picture.module.scss";


export default function ViewerProfilePicture(props: {profile_picture}) {
  return (
    <div className={s.app}>
      {props.profile_picture}
    </div>
  );
}