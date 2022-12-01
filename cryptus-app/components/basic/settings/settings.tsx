import React, { useState, useEffect } from "react";
import s from "./settings.module.scss";
import { useRouter } from "next/router";
import { useSession } from "next-auth/client";

//import ContextualXButton from "../header/contextual_x_button/contextual_x_button";
import BackButton from "../header/back_button/back_button";
import UsenameSetting from "./username_setting/username_setting";
import AccountLink from "./account_link/account_link";
import LogoutSetting from "./logout_setting/logout_setting";
import SearchBar from "../../market/search_bar/search_bar";
import WalletManagerSetting from "./wallet_manager_setting/wallet_manager_setting";
//import ResetPasswordSetting from "./reset_password_setting/reset_password_setting";
import NotificationSetting from "./notification_setting/notification_setting";
import DarkThemeSetting from "./dark_theme_setting/dark_theme_setting";
import SupportSetting from "./support_setting/support_setting";
import Card from "../../utils/card/card";
import { isMobile } from "react-device-detect";

type settings_props = {
  isMobile: boolean;
  callback_close;
  open_wallet_manager: () => void;
  open_support: () => void;
};

export default function Settings(props: settings_props) {
  const [session, status] = useSession();
  const username = session?.user?.name;

  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        <div className={s.settingRows}>
          <UsenameSetting username={username} />
          <AccountLink username={username} />
          <WalletManagerSetting
            open_wallet_manager={props.open_wallet_manager}
          />
          <NotificationSetting />
          <DarkThemeSetting />
          <SupportSetting open_support={props.open_support} />
          <LogoutSetting />
        </div>
      </div>
    </Card>
  );
}
