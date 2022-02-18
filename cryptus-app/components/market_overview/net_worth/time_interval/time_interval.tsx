//react and css
import React, { useState, useEffect } from "react";
import s from "./time_interval.module.scss";

//external exports

//internal imports

export default function TimeInterval(props: { active: string }) {
  return (
    <div className={s.container_row}>
      <div className={s.icon}>1W</div>
      <div className={s.icon}>1M</div>
      <div className={s.icon}>3M</div>
      <div className={s.icon}>1Y</div>
    </div>
  );
}
