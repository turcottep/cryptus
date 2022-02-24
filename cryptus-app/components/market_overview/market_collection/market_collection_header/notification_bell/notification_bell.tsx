import React from "react";
import s from "./notification_bell.module.scss";

export default function NotificationBell() {
  return (
    <a href="login" target="_blank" className={s.icon}>
      <img src="/icons/notification_icon.png" />
    </a>
  );
}
