import React, { useEffect, useState } from "react";
import s from "./header.module.scss";

export default function Header() {
  return (
    <div id="header" className={s.container}>
      <div className={s.home}>
        <Title />
      </div>
      <div className={s.tabs}>
        <Tab name="market" url="/#artists" />
        <Tab name="home" url="/projects/1" />
        <Tab name="discover" url="/#about" />
        <Tab name="profile" url="/#team" />
      </div>
      <div className={s.icons}>
        <Icon img="/images/twitter_black.png" url="https://twitter.com/" />
      </div>
    </div>
  );
}

const Title = () => (
  <a href="#" className={s.title}>
    Public Wallet
  </a>
);

const Tab = (props: { name: string; url: string }) => (
  <a href={props.url} className={s.tab}>
    {props.name.toUpperCase()}
  </a>
);

const Icon = (props: { img: string; url: string }) => (
  <a href={props.url} target="_blank" className={s.icon}>
    <img src={props.img} />
  </a>
);
