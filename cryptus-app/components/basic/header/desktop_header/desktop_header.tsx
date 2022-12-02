import React, { useEffect, useState } from "react";
import s from "./desktop_header.module.scss";

import { signIn, useSession } from "next-auth/client";

import ContextualMenuButton from "../contextual_menu_button/contextual_menu_button";
import { Header } from "../../../building_blocks/building_blocks";
import connectMetamask from "../../../../lib/connectMetamask";
import { isMobile } from "react-device-detect";
import {
  Notifications,
  NotificationsOutlined,
  Search,
  Settings,
  SettingsOutlined,
} from "@mui/icons-material";

export default function DesktopHeader(props: {
  tab: string;
  toggle_settings: () => void;
  toggle_search: () => void;
  isMobile?: boolean;
}) {
  const [session, loading] = useSession();
  const [name, setName] = useState("");
  const [imgUrl, setImgUrl] = useState("/icons/menu_icon.png");
  const { tab } = props;

  useEffect(() => {
    if (session) {
      const name = session.user.name;
      setName(name);
      setImgUrl("/icons/settings_icon.png");
    }
  }, [loading]);

  const tabs = [
    { name: "market", url: "/market" },
    // { name: "search", url: "/market" },
    { name: "profile", url: `/${name}` },
  ];

  const notifyMe = () => {
    if (!("Notification" in window)) {
      // Check if the browser supports notifications
      alert("This browser does not support desktop notification");
    } else if (Notification.permission === "granted") {
      // Check whether notification permissions have already been granted;
      // if so, create a notification
      const notification = new Notification("Hi there!");
      // …
    } else if (Notification.permission !== "denied") {
      // We need to ask the user for permission
      Notification.requestPermission().then((permission) => {
        // If the user accepts, let's create a notification
        if (permission === "granted") {
          const notification = new Notification("Hi there!");
          // …
        }
      });
    }
  };

  return (
    <Header>
      <div id="header" className={s.container}>
        <div className={s.home}>
          <a href="/">{isMobile ? "PW" : "PublicWallet"}</a>
        </div>
        <div className={s.tabs}>
          <Tab
            name={tabs[0].name}
            key={tabs[0].name}
            url={tabs[0].url}
            isActive={tabs[0].name == tab}
          />
          <div>⏐</div>
          <Tab
            name={tabs[1].name}
            key={tabs[1].name}
            url={tabs[1].url}
            isActive={tabs[1].name == tab}
          />
        </div>
        <div className={s.icons}>
          <div onClick={props.toggle_search} className={s.icon}>
            <Search />
          </div>
          <div
            className={s.icon}
            onClick={() => {
              notifyMe();
            }}
          >
            <NotificationsOutlined />
          </div>
          <div onClick={props.toggle_settings} className={s.icon}>
            <SettingsOutlined />
          </div>
        </div>
      </div>
    </Header>
  );
}

const Tab = (props: { name: string; url: string; isActive: boolean }) =>
  props.isActive ? (
    <a href={props.url} className={s.tabactive}>
      {props.name}
    </a>
  ) : (
    <a href={props.url} className={s.tab}>
      {props.name}
    </a>
  );
