import React, { useState, useEffect } from "react";
import s from "./username_setting.module.scss";

export default function UsernameSetting(props: { username: string }) {
  return (
    <div className={s.container}>
      <div className={s.title}>Username</div>
      <div className={s.settingCol}>
        {props.username}
        <div className={s.iconDiv}>
          <img className={s.icon} src="/icons/back_icon.png" />
        </div>
      </div>
    </div>
  );
}
