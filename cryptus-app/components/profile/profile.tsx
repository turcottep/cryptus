import React, { useState, useEffect } from "react";
import s from "./profile.module.scss";

import ViewerProfile from "./viewer_profile/viewer_profile";

export default function Profile(props) {
  return (
    <ViewerProfile {...props} />
  );
}