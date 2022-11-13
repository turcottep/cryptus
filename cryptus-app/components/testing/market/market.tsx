import React, { useState, useEffect } from "react";
import s from "./market.module.scss";

import { Header, Page, Popup } from "../buildingblocks/buildingblocks";

export default function Market(props: { data: any }) {
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
      <Collections data={props.data} />
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

export const Tile = (props: { c: any }) => {
  const { c } = props;
  return (
    <div key={c}>
      <div className={s.collection}>
        <div className={s.bla}>{c.imgurl}</div>
        <div className={s.bla}>
          <div className={s.bla}>{c.name}</div>
          <div className={s.bla}>{c.description}</div>
        </div>
        <div className={s.graphic}>{c.graph}</div>
        <div className={s.bla}>
          <div className={s.bla}>{c.price}</div>
          <div className={s.bla}>{c.change}</div>
        </div>
      </div>
    </div>
  );
};

export const Collections = (props: { data: any }) => {
  return (
    <div className={s.collections}>
      {props.data.map((collection) => (
        <Tile c={collection} />
      ))}
    </div>
  );
};
