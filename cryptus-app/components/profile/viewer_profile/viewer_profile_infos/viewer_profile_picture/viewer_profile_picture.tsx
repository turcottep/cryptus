import { props } from "cypress/types/bluebird";
import React, { useState, useEffect } from "react";
import s from "./viewer_profile_picture.module.scss";


export default function ViewerProfilePicture() {
  return (
    <div className={s.container}>
      <img
            className={s.profilePic}
            src="./icons/icon-192x192.png"
            alt="Avatar"
          />
    </div>
  );
}