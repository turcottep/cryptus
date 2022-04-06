import React, { useState, useEffect } from "react";
import s from "./reset_password_setting.module.scss";

export default function ResetPasswordSetting() {
  return (
    <div className={s.container}>
      <div className={s.settingCol}>
        Reset Password
        <div className={s.iconDiv}>
          <img className={s.icon} src="/icons/back_icon.png" />
        </div>
      </div>
    </div>
  );
}
