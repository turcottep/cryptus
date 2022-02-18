import React, { useEffect, useState } from "react";
import s from "./footer.module.scss";

import MarketOverviewIcon from "./market_overview_icon/market_overview_icon"
import CurrentPageIcon from "./current_page_icon/current_page_icon"
import NotificationIcon from "./notification_icon/notification_icon"
import CreatorProfileButton from "./creator_profile_button/creator_profile_button"

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




