import React, { useEffect, useState } from "react";
import s from "./desktop_header.module.scss";

import { signIn, useSession } from "next-auth/client";

import ContextualMenuButton from "../contextual_menu_button/contextual_menu_button";
import { Header } from "../../../building_blocks/building_blocks";
import connectMetamask from "../../../../lib/connectMetamask";
import { isMobile } from "react-device-detect";
import { Search } from "@mui/icons-material";

export default function DesktopHeader(props: {
  tab: string;
  open_settings: () => void;
  open_search: () => void;
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
          <div onClick={props.open_search} className={s.icon}>
            <Search />
          </div>
          <Icon img="/icons/notification_icon.png" url="/market" />
          <div onClick={props.open_settings} className={s.icon}>
            <img src={imgUrl} className={s.image} />
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

const Tab2 = (props: { name: string; url: string; isActive: boolean }) => (
  <div
    onClick={() => {
      // alert("not connected!");
      // signIn();
      connectMetamask(
        () => {},
        () => {}
      );
    }}
    className={s.tab}
  >
    {props.name}
  </div>
);

const Icon = (props: { img: string; url: string }) => (
  <a href={props.url} target="_blank" className={s.icon}>
    <img src={props.img} />
  </a>
);
