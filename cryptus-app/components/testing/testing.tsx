import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

import { Header, Page, Popup } from "./buildingblocks/buildingblocks";
import Market, { Networth } from "./market/market";
import Collection from "./collection/collection";

export default function Testing(props: {}) {
  const [v, setV] = useState(false);
  const [c, setC] = useState(false);
  const data = [1, 2, 3, 4, 5, 6];

  return (
    <Page>
      <Market />
      <Collection v={v} />
      <Popup v={false}>
        <Header>
          <div className={s.test}>dsada</div>
        </Header>
        <div className={s.search}>
          <div className={s.input}>input</div>
          <div className={s.results}></div>
        </div>
      </Popup>
    </Page>
  );
}
