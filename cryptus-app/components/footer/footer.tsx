import React, { useEffect, useState } from "react";
import s from "./footer.module.scss";


export default function Footer() {
  return (
    <div id="footer" className={s.container}>
      <div className={s.button}>
        <MarketOverviewIcon />
      </div>
      <div className={s.button}>
        <CurrentPageIcon icon="icons/research_icon.png" />
      </div>
      <div className={s.button}>
        <NotificationIcon />
      </div>
      <div className={s.button}>
        <CreatorProfileButton user="icons/profile_icon.png" />
      </div>
    </div>
  );
}

const MarketOverviewIcon = () => (
  <a href="login" target="_blank" className={s.icon}>
      <img src="icons/market_overview_icon.png" />
  </a>
);

const CurrentPageIcon = (props: { icon: string }) => (
  <div className={s.icon}>
    <img src={props.icon} />
  </div>
);

const NotificationIcon = () => (
  <a href="login" target="_blank" className={s.icon}>
      <img src="icons/notification_icon.png" />
  </a>
);

const CreatorProfileButton = (props: { user: string }) => (
  <a href="login" target="_blank" className={s.icon}>
      <img src={props.user} />
  </a>
);




