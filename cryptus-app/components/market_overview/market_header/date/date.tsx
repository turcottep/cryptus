//react and css
import React, { useState, useEffect } from "react";
import s from "./date.module.scss";

//external exports

//internal imports

export default function DateComponent(props: { date: string }) {
  const { date } = props;
  return (
    <div className={s.container}>
      <div className={s.block}>
        <div className={s.name}>{props.date}</div>
      </div>
    </div>
  );
}
