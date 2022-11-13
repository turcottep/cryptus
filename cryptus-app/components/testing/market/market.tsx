import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";

export default function Market() {
  const collections = [1, 2, 3, 4];
  return (
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
      <Networth />
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
  );
}

export const Networth = () => {
  return (
    <div className={s.networth}>
      <div className={s.number}>
        <div className={s.num}>number</div>
        <div className={s.fiat}>fiat</div>
        <div className={s.change}>change</div>
      </div>
      <div className={s.graph}>graph</div>
    </div>
  );
};
