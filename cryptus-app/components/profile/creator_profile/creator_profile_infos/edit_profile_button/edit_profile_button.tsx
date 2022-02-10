import React, { useState, useEffect } from "react";
import s from "./edit_profile_button.module.scss";


export default function EditProfileButton() {
  return (
    <div className={s.container}>
      <button className={s.editbutton}>
        Edit Profile
      </button>
    </div>
  );
}