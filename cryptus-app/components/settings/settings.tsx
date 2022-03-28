import React, { useState, useEffect } from "react";
import s from "./settings.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import UsenameSetting from "./username_setting/username_setting";
import AccountLink from "./account_link/account_link";
import LogoutSetting from "./logout_setting/logout_setting";
import SearchBar from "../market_overview/search_bar/search_bar";
import WalletManagerSetting from "./wallet_manager_setting/wallet_manager_setting";
//import ResetPasswordSetting from "./reset_password_setting/reset_password_setting";
import NotificationSetting from "./notification_setting/notification_setting";
import DarkThemeSetting from "./dark_theme_setting/dark_theme_setting";
import SupportSetting from "./support_setting/support_setting";

export default function Settings() {
  const [session, status] = useSession();
  const username = session?.user?.name;

  return (
    <div className={s.container}>
      <SettingsHeader />
      <div className={s.searchBar}>
        <SearchBar />
      </div>
      <div className={s.settingRows}>
        <UsenameSetting username={username} />
        <AccountLink username={username} />
        <WalletManagerSetting />
        <NotificationSetting />
        <DarkThemeSetting />
        <SupportSetting />
        <LogoutSetting />
      </div>
    </div>
  );
}

const SettingsHeader = () => (
  <div className={s.header}>
    <div className={s.backButton}>
      <BackButton />
    </div>
    <div className={s.settingsTitle}>Settings</div>
    <div className={s.blankButton} />
  </div>
);
