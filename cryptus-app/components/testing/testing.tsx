import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

import { Header, Page, Popup } from "./buildingblocks/buildingblocks";

export default function Testing(props: {}) {
  const [v, setValue] = useState(false);
  const collections = [1, 2, 3, 4];

  return (
    <Page>
      <div className={s.market}>
        <Header>
          <div className={s.header}>
            <div className={s.bla}>logo</div>
            <div className={s.bla}>menu</div>
            <div className={s.bla}>icons</div>
          </div>
        </Header>
        <div className={s.modifiers}>
          <div className={s.bla}>1M</div>
          <div className={s.bla}>filters</div>
          <div className={s.bla}>sort</div>
        </div>
        <div className={s.networth}>
          <div className={s.number}>
            <div className={s.num}>number</div>
            <div className={s.fiat}>fiat</div>
            <div className={s.change}>change</div>
          </div>
          <div className={s.graph}>graph</div>
        </div>
        <div className={s.collections}>
          {collections.map((collection) => (
            <div key={collection}>
              <div className={s.collection}>
                <div className={s.bla}>image</div>
                <div className={s.bla}>
                  <div className={s.bla}>name</div>
                  <div className={s.bla}>description</div>
                </div>
                <div className={s.graphic}>graphic</div>
                <div className={s.bla}>
                  <div className={s.bla}>price</div>
                  <div className={s.bla}>change</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Popup v={v}>
        <div className={s.collection}>
          <div className={s.blablabla}>collection</div>
          <div className={s.price}></div>
          <div className={s.data}></div>
        </div>
      </Popup>
      <Popup v={v}>
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
