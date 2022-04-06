import React, { useState, useEffect } from "react";
import s from "./settings.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";

import Card from "../utils/card/card";
import SearchBar from "../market/search_bar/search_bar";
import AccountLink from "../basic/settings/account_link/account_link";
import WalletManagerSetting from "../basic/settings/wallet_manager_setting/wallet_manager_setting";
import NotificationSetting from "../basic/settings/notification_setting/notification_setting";
import DarkThemeSetting from "../basic/settings/dark_theme_setting/dark_theme_setting";
import SupportSetting from "../basic/settings/support_setting/support_setting";
import LogoutSetting from "../basic/settings/logout_setting/logout_setting";
import UsernameSetting from "../basic/settings/username_setting/username_setting";

type settings_props = {
  isMobile: boolean;
  callback_close;
  open_wallet_manager: () => void;
};

export default function Settings(props: settings_props) {
  const [session, status] = useSession();
  const username = session?.user?.name;

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.searchBar}>
        <SearchBar />
      </div>
      <div className={s.settingRows}>
        <UsernameSetting username={username} />
        <AccountLink username={username} />
        <WalletManagerSetting open_wallet_manager={props.open_wallet_manager} />
        <NotificationSetting />
        <DarkThemeSetting />
        <SupportSetting />
        <LogoutSetting />
      </div>
    </Card>
  );
}
