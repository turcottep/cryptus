import React, { useState, useEffect } from "react";
import s from "./edit_profile_button.module.scss";

import Button from "@mui/material/Button";

export default function EditProfileButton() {
  return (
    <div className={s.container}>
      <a className={s.editbutton} href="/edit_profile">
        Edit Profile
      </a>
    </div>
  );
}
