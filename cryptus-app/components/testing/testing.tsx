import React, { useState, useEffect } from "react";
import s from "./testing.module.scss";

export default function Testing(props: {}) {
  const [v, setValue] = useState(false);

  return (
    <Page>
      <div className={s.market}>
        <Header>
          <div className={s.he1}>logo</div>
          <div className={s.he1}>pages</div>
          <div className={s.he1}>icons</div>
        </Header>
        <div className={s.modifiers}>modifiers</div>
        <div className={s.networth}>networth</div>
        <div className={s.collections}>collections</div>
      </div>
      <Popup v={v}>
        <div className={s.collection}>
          <div className={s.header}>collection</div>
          <div className={s.price}></div>
          <div className={s.data}></div>
        </div>
      </Popup>
      <Popup v={v}>
        <div className={s.search}>
          <div className={s.input}>input</div>
          <div className={s.results}></div>
        </div>
      </Popup>
    </Page>
  );
}

const Header = (props: { children: React.ReactNode }) => {
  return (
    <div className={s.header}>
      <div className={s.headercontent}>{props.children}</div>
    </div>
  );
};

const Page = (props: { children: React.ReactNode }) => {
  return (
    <div className={s.page}>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};

const Popup = (props: { children: React.ReactNode; v: boolean }) => {
  const [visibility, setVisibility] = useState(false);
  useEffect(() => {
    setVisibility(props.v);
  }, [props.v]);

  return visibility ? (
    <div className={s.popuppage}>
      <div className={s.popupcontent}>{props.children}</div>
    </div>
  ) : null;
};
