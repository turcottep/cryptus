import React, { useState, useEffect } from "react";
import s from "./search.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";
import { Collections, Networth } from "../market/market";

export default function Search(props: { data: any[]; v: boolean }) {
  return (
    <Popup v={true}>
      <Header>
        <div className={s.header}>
          <input className={s.input} />
          <div className={s.icon}>X</div>
        </div>
      </Header>
      <Collections data={props.data} />
    </Popup>
  );
}
