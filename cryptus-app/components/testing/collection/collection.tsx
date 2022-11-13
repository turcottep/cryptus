import React, { useState, useEffect } from "react";
import s from "./collection.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";
import { Networth } from "../market/market";

export default function Collection(props: { v: boolean }) {
  const data = [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
    { name: "c", value: 3 },
    { name: "d", value: 4 },
    { name: "e", value: 5 },
    { name: "f", value: 6 },
  ];
  return (
    <Popup v={props.v}>
      <div className={s.collection}>
        <Header>
          <div className={s.header}>
            <div className={s.tile}>
              <div className={s.logo}>pfp</div>
              <div className={s.name}>name</div>
              <div className={s.keystat}>keystat</div>
            </div>
            <div className={s.bla}>buy</div>

            <div className={s.bla}>X</div>
          </div>
        </Header>
        <Networth />
        <Stat title="Stats" data={data} />
        <Stat title="Floor" data={data} />
        <Stat title="Last Sales" data={data} />
        <Stat title="Metadata" data={data} />
      </div>
    </Popup>
  );
}

export const Collapsable = (props: {
  children: React.ReactNode;
  title: string;
}) => {
  const [c, setC] = useState(true);

  return (
    <div
      className={s.collapsable}
      onClick={(e) => {
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setC(!c);
      }}
    >
      <div>
        <div className={s.title}>{props.title}</div>
        <div className={s.arrow}>{c ? "▼" : "▲"}</div>
      </div>
      {c ? null : props.children}
    </div>
  );
};

export const Stat = (props: {
  data: { name: string; value: string | number }[];
  title: string;
}) => {
  return (
    <Collapsable title={props.title}>
      <div className={s.stats}>
        {props.data.map((d) => (
          <div
            key={d.name}
            className={s.stat}
            onClick={(e) => e.stopPropagation()}
          >
            <div className={s.bla}>{d.value}</div>
            <div className={s.bla}>{d.name}</div>
          </div>
        ))}
      </div>
    </Collapsable>
  );
};
