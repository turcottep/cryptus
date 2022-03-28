import React, { useState, useEffect } from "react";
import s from "./notification_setting.module.scss";
import { Switch } from "@mui/material";

export default function NotificationSetting() {
  const [isToggled, setIsToggled] = useState(false);
  const onToggle = () => setIsToggled(!isToggled);
  const switchParams = {
    width: 48,
    height: 24,
    onChange: onToggle,
    checked: isToggled,
  };
  return (
    <div className={s.container}>
      <div className={s.settingCol}>
        Notifications
        <div className={s.iconDiv}>
          <Switch {...switchParams} />
        </div>
      </div>
    </div>
  );
}
