import React, { useEffect, useState } from "react";
import s from "./desktop_header.module.scss";

import { useSession } from "next-auth/client";

import ContextualMenuButton from "../contextual_menu_button/contextual_menu_button";
import { Header } from "../../../building_blocks/building_blocks";

export default function DesktopHeader(props: {
  tab: string;
  open_settings: () => void;
  open_search: () => void;
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
          <a href="/">Public Wallet</a>
        </div>
        <div className={s.tabs}>
          {tabs.map((t, i) => {
            const isActive = t.name == tab;

            if (name == "" && t.name == tabs[1].name) {
              return (
                <Tab2
                  name={t.name}
                  key={t.name}
                  url={t.url}
                  isActive={isActive}
                />
              );
            } else {
              return (
                <Tab
                  name={t.name}
                  key={t.name}
                  url={t.url}
                  isActive={isActive}
                />
              );
            }
          })}
        </div>
        <div className={s.icons}>
          <ContextualMenuButton
            img="magnifier.svg"
            open_settings={props.open_search}
          />
          <Icon img="/icons/notification_icon.png" url="/market" />
          <ContextualMenuButton
            img={imgUrl}
            open_settings={props.open_settings}
          />
        </div>
      </div>
    </Header>
    // </div>
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
      alert("not connected!");
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
