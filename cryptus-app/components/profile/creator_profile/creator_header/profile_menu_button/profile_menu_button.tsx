import React, { useState, useEffect } from "react";
import s from "./profile_menu_button.module.scss";

export default function ProfileMenuButton() {
  return (
    <div className={s.container}>
      <img className={s.menubutton} src="/icons/settings_icon" />
    </div>
  );
}
