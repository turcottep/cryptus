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

declare let window: any;


type settings_props = {
  isMobile: boolean;
  callback_close;
  open_wallet_manager: () => void;
  open_support: () => void;
};


export default function Settings(props: settings_props) {
  const [session, status] = useSession();
  const [registration, setRegistration] = useState(null);
  const username = session?.user?.name;
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator &&
      window.workbox !== undefined
    ) {
      console.log("DEEEEZ");

      // run only in browser
      navigator.serviceWorker.ready.then((reg) => {
        reg.pushManager.getSubscription().then((sub: any) => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {}
        });
        setRegistration(reg);
      });
    }
  }, []);
  async function subscribetonotifs(){
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY
      ),
    });
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    await fetch("/api/savesubscription", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          subscription:JSON.stringify(sub),
          user:username
        }),
      });
  }
  return (
    <Card callback_close={props.callback_close} isMobile={props.isMobile}>
      <div className={s.container}>
        {isMobile ? (
          <div className={s.searchBarMobile}>
            <SearchBar />
          </div>
        ) : (
          <div className={s.searchBar}>
            <SearchBar />
          </div>
        )}
        <div className={s.settingRows}>
          <UsenameSetting username={username} />
          <AccountLink username={username} />
          <WalletManagerSetting
            open_wallet_manager={props.open_wallet_manager}
          />
          <NotificationSetting />
          <DarkThemeSetting />
          <SupportSetting open_support={props.open_support} />
          <div onClick={subscribetonotifs}>Subscribe</div>
          <LogoutSetting />
        </div>
      </div>
    </Card>
  );
}


const base64ToUint8Array = (base64) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(b64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

