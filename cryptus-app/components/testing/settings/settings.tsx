import React, { useState, useEffect } from "react";
import s from "./settings.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";
import { Networth } from "../market/market";

export default function Settings(props: { v: boolean; d: any; f: any }) {
  const { v, d } = props;
  const data = [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
    { name: "c", value: 3 },
    { name: "d", value: 4 },
    { name: "e", value: 5 },
    { name: "f", value: 6 },
  ];
  const [w, setW] = useState(0); // [0: Settings, 1: Wallet Manager, 2: Support]

  return (
    <Popup v={v}>
      <Header>
        <div className={s.header}>
          <div className={s.tile}>
            <div className={s.logo}>{d.imgurl}</div>
            <div className={s.name}>{d.name}</div>
            <div className={s.keystat}>{d.description}</div>
          </div>
          <div className={s.bla}>buy</div>

          <div className={s.bla}>X</div>
        </div>
      </Header>
      <div className={s.abc}>settings</div>
      <WalletManager w={false} d={[]} f={[]} />
      <Support w={false} d={[]} f={[]} />
    </Popup>
  );
}

export const WalletManager = (props: { w: any; d: any; f: any }) => {
  const { w, d, f } = props;
  return (
    <Popup v={w}>
      <Header>
        <div className={s.header}>
          <div className={s.bla}>Wallet Manager</div>
          <div className={s.bla}>X</div>
        </div>
      </Header>
      <div className={s.abc}>Wallet Manager</div>
    </Popup>
  );
};

export const Support = (props: { w: any; d: any; f: any }) => {
  const { w, d, f } = props;
  return (
    <Popup v={w}>
      <Header>
        <div className={s.header}>
          <div className={s.bla}>Wallet Manager</div>
          <div className={s.bla}>X</div>
        </div>
      </Header>
      <div className={s.abc}>Wallet Manager</div>
    </Popup>
  );
};
