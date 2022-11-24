import React, { useState, useEffect } from "react";
import s from "./modifiers.module.scss";

import { Header, Page, Popup } from "../../buildingblocks/buildingblocks";
import { Modifiers as ModifierPods } from "../../market/market";
import SortButton from "../../../market/sort_button/sort_button";
import TimeInterval from "../../../market/market_header/time_interval/time_interval";

export default function Modifiers(props: { v: boolean; d: any; f: any }) {
  const { v, d } = props;
  const data = [
    { name: "a", value: 1 },
    { name: "b", value: 2 },
    { name: "c", value: 3 },
    { name: "d", value: 4 },
    { name: "e", value: 5 },
    { name: "f", value: 6 },
  ];
  const [w, setW] = useState(0); // [0: modifiers, 1: filters, 2: sort, 3: editcollections]

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

      <ModifierPods />
      <Filters d={[]} f={[]} w={w == 1} />
      <Sort d={[]} f={[]} w={w == 2} />
      <Time d={[]} f={[]} w={w == 3} />
    </Popup>
  );
}

//TODO: <SortButton /> is to have Jay's component here, but it should actualy be integraed

export const Filters = (props: { w: any; d: any; f: any }) => {
  const { w, d, f } = props;
  return <div>Filters</div>;
};

export const Sort = (props: { w: any; d: any; f: any }) => {
  const { w, d, f } = props;
  return <div>Sort</div>;
};

export const Time = (props: { w: any; d: any; f: any }) => {
  const { w, d, f } = props;
  return (
    <div>
      <TimeInterval active={d.networth.active} callback />
    </div>
  );
};
