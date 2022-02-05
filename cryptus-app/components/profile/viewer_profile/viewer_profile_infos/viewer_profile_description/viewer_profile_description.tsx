import React, { useState, useEffect } from "react";
import s from "./viewer_profile_description.module.scss";


export default function ViewerProfileDescription(props) {
  return (
    <div className={s.container}>
      {props.user.description}
    </div>
  );
}