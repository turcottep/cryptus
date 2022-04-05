import React, { useState, useEffect } from "react";
import s from "./support_setting.module.scss";

export default function SupportSetting() {
  return (
    <div className={s.container}>
      <div className={s.settingCol}>
        Support
        <div className={s.iconDiv}>
          <img className={s.icon} src="/icons/back_icon.png" />
        </div>
      </div>
    </div>
  );
}
