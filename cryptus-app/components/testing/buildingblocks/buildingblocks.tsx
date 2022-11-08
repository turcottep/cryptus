import React, { useState, useEffect } from "react";
import s from "./buildingblocks.module.scss";

export const Header = (props: { children: React.ReactNode }) => {
  return (
    <div className={s.header}>
      <div className={s.headercontent}>{props.children}</div>
    </div>
  );
};

export const Page = (props: { children: React.ReactNode }) => {
  return (
    <div className={s.page}>
      <div className={s.content}>{props.children}</div>
    </div>
  );
};

export const Popup = (props: { children: React.ReactNode; v: boolean }) => {
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
