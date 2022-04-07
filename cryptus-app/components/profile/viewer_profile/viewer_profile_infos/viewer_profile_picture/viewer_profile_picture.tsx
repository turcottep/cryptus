import { props } from "cypress/types/bluebird";
import React, { useState, useEffect } from "react";
import s from "./viewer_profile_picture.module.scss";

export default function ViewerProfilePicture(props: { image_url: string }) {
  const { image_url } = props;
  return (
    <div className={s.container}>
      <img className={s.profilePic} src={image_url} alt="Avatar" />
    </div>
  );
}
